#!/usr/bin/env node
import { createRequire as __b55cr } from 'node:module'; const require = __b55cr(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/error.js
var require_error = __commonJS({
  "node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/error.js"(exports) {
    var CommanderError2 = class extends Error {
      /**
       * Constructs the CommanderError class
       * @param {number} exitCode suggested exit code which could be used with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       */
      constructor(exitCode, code, message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = code;
        this.exitCode = exitCode;
        this.nestedError = void 0;
      }
    };
    var InvalidArgumentError2 = class extends CommanderError2 {
      /**
       * Constructs the InvalidArgumentError class
       * @param {string} [message] explanation of why argument is invalid
       */
      constructor(message) {
        super(1, "commander.invalidArgument", message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
      }
    };
    exports.CommanderError = CommanderError2;
    exports.InvalidArgumentError = InvalidArgumentError2;
  }
});

// node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/argument.js
var require_argument = __commonJS({
  "node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/argument.js"(exports) {
    var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var Argument2 = class {
      /**
       * Initialize a new command argument with the given name and description.
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @param {string} name
       * @param {string} [description]
       */
      constructor(name, description) {
        this.description = description || "";
        this.variadic = false;
        this.parseArg = void 0;
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.argChoices = void 0;
        switch (name[0]) {
          case "<":
            this.required = true;
            this._name = name.slice(1, -1);
            break;
          case "[":
            this.required = false;
            this._name = name.slice(1, -1);
            break;
          default:
            this.required = true;
            this._name = name;
            break;
        }
        if (this._name.length > 3 && this._name.slice(-3) === "...") {
          this.variadic = true;
          this._name = this._name.slice(0, -3);
        }
      }
      /**
       * Return argument name.
       *
       * @return {string}
       */
      name() {
        return this._name;
      }
      /**
       * @package
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Argument}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Set the custom handler for processing CLI command arguments into argument values.
       *
       * @param {Function} [fn]
       * @return {Argument}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Only allow argument value to be one of choices.
       *
       * @param {string[]} values
       * @return {Argument}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError2(
              `Allowed choices are ${this.argChoices.join(", ")}.`
            );
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Make argument required.
       *
       * @returns {Argument}
       */
      argRequired() {
        this.required = true;
        return this;
      }
      /**
       * Make argument optional.
       *
       * @returns {Argument}
       */
      argOptional() {
        this.required = false;
        return this;
      }
    };
    function humanReadableArgName(arg) {
      const nameOutput = arg.name() + (arg.variadic === true ? "..." : "");
      return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
    }
    exports.Argument = Argument2;
    exports.humanReadableArgName = humanReadableArgName;
  }
});

// node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/help.js
var require_help = __commonJS({
  "node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/help.js"(exports) {
    var { humanReadableArgName } = require_argument();
    var Help2 = class {
      constructor() {
        this.helpWidth = void 0;
        this.sortSubcommands = false;
        this.sortOptions = false;
        this.showGlobalOptions = false;
      }
      /**
       * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
       *
       * @param {Command} cmd
       * @returns {Command[]}
       */
      visibleCommands(cmd) {
        const visibleCommands = cmd.commands.filter((cmd2) => !cmd2._hidden);
        const helpCommand = cmd._getHelpCommand();
        if (helpCommand && !helpCommand._hidden) {
          visibleCommands.push(helpCommand);
        }
        if (this.sortSubcommands) {
          visibleCommands.sort((a, b) => {
            return a.name().localeCompare(b.name());
          });
        }
        return visibleCommands;
      }
      /**
       * Compare options for sort.
       *
       * @param {Option} a
       * @param {Option} b
       * @returns {number}
       */
      compareOptions(a, b) {
        const getSortKey = (option) => {
          return option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
        };
        return getSortKey(a).localeCompare(getSortKey(b));
      }
      /**
       * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleOptions(cmd) {
        const visibleOptions = cmd.options.filter((option) => !option.hidden);
        const helpOption = cmd._getHelpOption();
        if (helpOption && !helpOption.hidden) {
          const removeShort = helpOption.short && cmd._findOption(helpOption.short);
          const removeLong = helpOption.long && cmd._findOption(helpOption.long);
          if (!removeShort && !removeLong) {
            visibleOptions.push(helpOption);
          } else if (helpOption.long && !removeLong) {
            visibleOptions.push(
              cmd.createOption(helpOption.long, helpOption.description)
            );
          } else if (helpOption.short && !removeShort) {
            visibleOptions.push(
              cmd.createOption(helpOption.short, helpOption.description)
            );
          }
        }
        if (this.sortOptions) {
          visibleOptions.sort(this.compareOptions);
        }
        return visibleOptions;
      }
      /**
       * Get an array of the visible global options. (Not including help.)
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleGlobalOptions(cmd) {
        if (!this.showGlobalOptions) return [];
        const globalOptions = [];
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          const visibleOptions = ancestorCmd.options.filter(
            (option) => !option.hidden
          );
          globalOptions.push(...visibleOptions);
        }
        if (this.sortOptions) {
          globalOptions.sort(this.compareOptions);
        }
        return globalOptions;
      }
      /**
       * Get an array of the arguments if any have a description.
       *
       * @param {Command} cmd
       * @returns {Argument[]}
       */
      visibleArguments(cmd) {
        if (cmd._argsDescription) {
          cmd.registeredArguments.forEach((argument) => {
            argument.description = argument.description || cmd._argsDescription[argument.name()] || "";
          });
        }
        if (cmd.registeredArguments.find((argument) => argument.description)) {
          return cmd.registeredArguments;
        }
        return [];
      }
      /**
       * Get the command term to show in the list of subcommands.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandTerm(cmd) {
        const args = cmd.registeredArguments.map((arg) => humanReadableArgName(arg)).join(" ");
        return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + // simplistic check for non-help option
        (args ? " " + args : "");
      }
      /**
       * Get the option term to show in the list of options.
       *
       * @param {Option} option
       * @returns {string}
       */
      optionTerm(option) {
        return option.flags;
      }
      /**
       * Get the argument term to show in the list of arguments.
       *
       * @param {Argument} argument
       * @returns {string}
       */
      argumentTerm(argument) {
        return argument.name();
      }
      /**
       * Get the longest command term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestSubcommandTermLength(cmd, helper) {
        return helper.visibleCommands(cmd).reduce((max, command) => {
          return Math.max(max, helper.subcommandTerm(command).length);
        }, 0);
      }
      /**
       * Get the longest option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestOptionTermLength(cmd, helper) {
        return helper.visibleOptions(cmd).reduce((max, option) => {
          return Math.max(max, helper.optionTerm(option).length);
        }, 0);
      }
      /**
       * Get the longest global option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestGlobalOptionTermLength(cmd, helper) {
        return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
          return Math.max(max, helper.optionTerm(option).length);
        }, 0);
      }
      /**
       * Get the longest argument term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestArgumentTermLength(cmd, helper) {
        return helper.visibleArguments(cmd).reduce((max, argument) => {
          return Math.max(max, helper.argumentTerm(argument).length);
        }, 0);
      }
      /**
       * Get the command usage to be displayed at the top of the built-in help.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandUsage(cmd) {
        let cmdName = cmd._name;
        if (cmd._aliases[0]) {
          cmdName = cmdName + "|" + cmd._aliases[0];
        }
        let ancestorCmdNames = "";
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          ancestorCmdNames = ancestorCmd.name() + " " + ancestorCmdNames;
        }
        return ancestorCmdNames + cmdName + " " + cmd.usage();
      }
      /**
       * Get the description for the command.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandDescription(cmd) {
        return cmd.description();
      }
      /**
       * Get the subcommand summary to show in the list of subcommands.
       * (Fallback to description for backwards compatibility.)
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandDescription(cmd) {
        return cmd.summary() || cmd.description();
      }
      /**
       * Get the option description to show in the list of options.
       *
       * @param {Option} option
       * @return {string}
       */
      optionDescription(option) {
        const extraInfo = [];
        if (option.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (option.defaultValue !== void 0) {
          const showDefault = option.required || option.optional || option.isBoolean() && typeof option.defaultValue === "boolean";
          if (showDefault) {
            extraInfo.push(
              `default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`
            );
          }
        }
        if (option.presetArg !== void 0 && option.optional) {
          extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
        }
        if (option.envVar !== void 0) {
          extraInfo.push(`env: ${option.envVar}`);
        }
        if (extraInfo.length > 0) {
          return `${option.description} (${extraInfo.join(", ")})`;
        }
        return option.description;
      }
      /**
       * Get the argument description to show in the list of arguments.
       *
       * @param {Argument} argument
       * @return {string}
       */
      argumentDescription(argument) {
        const extraInfo = [];
        if (argument.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (argument.defaultValue !== void 0) {
          extraInfo.push(
            `default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`
          );
        }
        if (extraInfo.length > 0) {
          const extraDescripton = `(${extraInfo.join(", ")})`;
          if (argument.description) {
            return `${argument.description} ${extraDescripton}`;
          }
          return extraDescripton;
        }
        return argument.description;
      }
      /**
       * Generate the built-in help text.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {string}
       */
      formatHelp(cmd, helper) {
        const termWidth = helper.padWidth(cmd, helper);
        const helpWidth = helper.helpWidth || 80;
        const itemIndentWidth = 2;
        const itemSeparatorWidth = 2;
        function formatItem(term, description) {
          if (description) {
            const fullText = `${term.padEnd(termWidth + itemSeparatorWidth)}${description}`;
            return helper.wrap(
              fullText,
              helpWidth - itemIndentWidth,
              termWidth + itemSeparatorWidth
            );
          }
          return term;
        }
        function formatList(textArray) {
          return textArray.join("\n").replace(/^/gm, " ".repeat(itemIndentWidth));
        }
        let output = [`Usage: ${helper.commandUsage(cmd)}`, ""];
        const commandDescription = helper.commandDescription(cmd);
        if (commandDescription.length > 0) {
          output = output.concat([
            helper.wrap(commandDescription, helpWidth, 0),
            ""
          ]);
        }
        const argumentList = helper.visibleArguments(cmd).map((argument) => {
          return formatItem(
            helper.argumentTerm(argument),
            helper.argumentDescription(argument)
          );
        });
        if (argumentList.length > 0) {
          output = output.concat(["Arguments:", formatList(argumentList), ""]);
        }
        const optionList = helper.visibleOptions(cmd).map((option) => {
          return formatItem(
            helper.optionTerm(option),
            helper.optionDescription(option)
          );
        });
        if (optionList.length > 0) {
          output = output.concat(["Options:", formatList(optionList), ""]);
        }
        if (this.showGlobalOptions) {
          const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
            return formatItem(
              helper.optionTerm(option),
              helper.optionDescription(option)
            );
          });
          if (globalOptionList.length > 0) {
            output = output.concat([
              "Global Options:",
              formatList(globalOptionList),
              ""
            ]);
          }
        }
        const commandList = helper.visibleCommands(cmd).map((cmd2) => {
          return formatItem(
            helper.subcommandTerm(cmd2),
            helper.subcommandDescription(cmd2)
          );
        });
        if (commandList.length > 0) {
          output = output.concat(["Commands:", formatList(commandList), ""]);
        }
        return output.join("\n");
      }
      /**
       * Calculate the pad width from the maximum term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      padWidth(cmd, helper) {
        return Math.max(
          helper.longestOptionTermLength(cmd, helper),
          helper.longestGlobalOptionTermLength(cmd, helper),
          helper.longestSubcommandTermLength(cmd, helper),
          helper.longestArgumentTermLength(cmd, helper)
        );
      }
      /**
       * Wrap the given string to width characters per line, with lines after the first indented.
       * Do not wrap if insufficient room for wrapping (minColumnWidth), or string is manually formatted.
       *
       * @param {string} str
       * @param {number} width
       * @param {number} indent
       * @param {number} [minColumnWidth=40]
       * @return {string}
       *
       */
      wrap(str2, width, indent, minColumnWidth = 40) {
        const indents = " \\f\\t\\v\xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF";
        const manualIndent = new RegExp(`[\\n][${indents}]+`);
        if (str2.match(manualIndent)) return str2;
        const columnWidth = width - indent;
        if (columnWidth < minColumnWidth) return str2;
        const leadingStr = str2.slice(0, indent);
        const columnText = str2.slice(indent).replace("\r\n", "\n");
        const indentString = " ".repeat(indent);
        const zeroWidthSpace = "\u200B";
        const breaks = `\\s${zeroWidthSpace}`;
        const regex2 = new RegExp(
          `
|.{1,${columnWidth - 1}}([${breaks}]|$)|[^${breaks}]+?([${breaks}]|$)`,
          "g"
        );
        const lines = columnText.match(regex2) || [];
        return leadingStr + lines.map((line, i) => {
          if (line === "\n") return "";
          return (i > 0 ? indentString : "") + line.trimEnd();
        }).join("\n");
      }
    };
    exports.Help = Help2;
  }
});

// node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/option.js
var require_option = __commonJS({
  "node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/option.js"(exports) {
    var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var Option2 = class {
      /**
       * Initialize a new `Option` with the given `flags` and `description`.
       *
       * @param {string} flags
       * @param {string} [description]
       */
      constructor(flags, description) {
        this.flags = flags;
        this.description = description || "";
        this.required = flags.includes("<");
        this.optional = flags.includes("[");
        this.variadic = /\w\.\.\.[>\]]$/.test(flags);
        this.mandatory = false;
        const optionFlags = splitOptionFlags(flags);
        this.short = optionFlags.shortFlag;
        this.long = optionFlags.longFlag;
        this.negate = false;
        if (this.long) {
          this.negate = this.long.startsWith("--no-");
        }
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.presetArg = void 0;
        this.envVar = void 0;
        this.parseArg = void 0;
        this.hidden = false;
        this.argChoices = void 0;
        this.conflictsWith = [];
        this.implied = void 0;
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Option}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Preset to use when option used without option-argument, especially optional but also boolean and negated.
       * The custom processing (parseArg) is called.
       *
       * @example
       * new Option('--color').default('GREYSCALE').preset('RGB');
       * new Option('--donate [amount]').preset('20').argParser(parseFloat);
       *
       * @param {*} arg
       * @return {Option}
       */
      preset(arg) {
        this.presetArg = arg;
        return this;
      }
      /**
       * Add option name(s) that conflict with this option.
       * An error will be displayed if conflicting options are found during parsing.
       *
       * @example
       * new Option('--rgb').conflicts('cmyk');
       * new Option('--js').conflicts(['ts', 'jsx']);
       *
       * @param {(string | string[])} names
       * @return {Option}
       */
      conflicts(names) {
        this.conflictsWith = this.conflictsWith.concat(names);
        return this;
      }
      /**
       * Specify implied option values for when this option is set and the implied options are not.
       *
       * The custom processing (parseArg) is not called on the implied values.
       *
       * @example
       * program
       *   .addOption(new Option('--log', 'write logging information to file'))
       *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
       *
       * @param {object} impliedOptionValues
       * @return {Option}
       */
      implies(impliedOptionValues) {
        let newImplied = impliedOptionValues;
        if (typeof impliedOptionValues === "string") {
          newImplied = { [impliedOptionValues]: true };
        }
        this.implied = Object.assign(this.implied || {}, newImplied);
        return this;
      }
      /**
       * Set environment variable to check for option value.
       *
       * An environment variable is only used if when processed the current option value is
       * undefined, or the source of the current value is 'default' or 'config' or 'env'.
       *
       * @param {string} name
       * @return {Option}
       */
      env(name) {
        this.envVar = name;
        return this;
      }
      /**
       * Set the custom handler for processing CLI option arguments into option values.
       *
       * @param {Function} [fn]
       * @return {Option}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Whether the option is mandatory and must have a value after parsing.
       *
       * @param {boolean} [mandatory=true]
       * @return {Option}
       */
      makeOptionMandatory(mandatory = true) {
        this.mandatory = !!mandatory;
        return this;
      }
      /**
       * Hide option in help.
       *
       * @param {boolean} [hide=true]
       * @return {Option}
       */
      hideHelp(hide = true) {
        this.hidden = !!hide;
        return this;
      }
      /**
       * @package
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Only allow option value to be one of choices.
       *
       * @param {string[]} values
       * @return {Option}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError2(
              `Allowed choices are ${this.argChoices.join(", ")}.`
            );
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Return option name.
       *
       * @return {string}
       */
      name() {
        if (this.long) {
          return this.long.replace(/^--/, "");
        }
        return this.short.replace(/^-/, "");
      }
      /**
       * Return option name, in a camelcase format that can be used
       * as a object attribute key.
       *
       * @return {string}
       */
      attributeName() {
        return camelcase(this.name().replace(/^no-/, ""));
      }
      /**
       * Check if `arg` matches the short or long flag.
       *
       * @param {string} arg
       * @return {boolean}
       * @package
       */
      is(arg) {
        return this.short === arg || this.long === arg;
      }
      /**
       * Return whether a boolean option.
       *
       * Options are one of boolean, negated, required argument, or optional argument.
       *
       * @return {boolean}
       * @package
       */
      isBoolean() {
        return !this.required && !this.optional && !this.negate;
      }
    };
    var DualOptions = class {
      /**
       * @param {Option[]} options
       */
      constructor(options) {
        this.positiveOptions = /* @__PURE__ */ new Map();
        this.negativeOptions = /* @__PURE__ */ new Map();
        this.dualOptions = /* @__PURE__ */ new Set();
        options.forEach((option) => {
          if (option.negate) {
            this.negativeOptions.set(option.attributeName(), option);
          } else {
            this.positiveOptions.set(option.attributeName(), option);
          }
        });
        this.negativeOptions.forEach((value, key) => {
          if (this.positiveOptions.has(key)) {
            this.dualOptions.add(key);
          }
        });
      }
      /**
       * Did the value come from the option, and not from possible matching dual option?
       *
       * @param {*} value
       * @param {Option} option
       * @returns {boolean}
       */
      valueFromOption(value, option) {
        const optionKey = option.attributeName();
        if (!this.dualOptions.has(optionKey)) return true;
        const preset = this.negativeOptions.get(optionKey).presetArg;
        const negativeValue = preset !== void 0 ? preset : false;
        return option.negate === (negativeValue === value);
      }
    };
    function camelcase(str2) {
      return str2.split("-").reduce((str3, word) => {
        return str3 + word[0].toUpperCase() + word.slice(1);
      });
    }
    function splitOptionFlags(flags) {
      let shortFlag;
      let longFlag;
      const flagParts = flags.split(/[ |,]+/);
      if (flagParts.length > 1 && !/^[[<]/.test(flagParts[1]))
        shortFlag = flagParts.shift();
      longFlag = flagParts.shift();
      if (!shortFlag && /^-[^-]$/.test(longFlag)) {
        shortFlag = longFlag;
        longFlag = void 0;
      }
      return { shortFlag, longFlag };
    }
    exports.Option = Option2;
    exports.DualOptions = DualOptions;
  }
});

// node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/suggestSimilar.js
var require_suggestSimilar = __commonJS({
  "node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/suggestSimilar.js"(exports) {
    var maxDistance = 3;
    function editDistance(a, b) {
      if (Math.abs(a.length - b.length) > maxDistance)
        return Math.max(a.length, b.length);
      const d = [];
      for (let i = 0; i <= a.length; i++) {
        d[i] = [i];
      }
      for (let j = 0; j <= b.length; j++) {
        d[0][j] = j;
      }
      for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
          let cost = 1;
          if (a[i - 1] === b[j - 1]) {
            cost = 0;
          } else {
            cost = 1;
          }
          d[i][j] = Math.min(
            d[i - 1][j] + 1,
            // deletion
            d[i][j - 1] + 1,
            // insertion
            d[i - 1][j - 1] + cost
            // substitution
          );
          if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
            d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
          }
        }
      }
      return d[a.length][b.length];
    }
    function suggestSimilar(word, candidates) {
      if (!candidates || candidates.length === 0) return "";
      candidates = Array.from(new Set(candidates));
      const searchingOptions = word.startsWith("--");
      if (searchingOptions) {
        word = word.slice(2);
        candidates = candidates.map((candidate) => candidate.slice(2));
      }
      let similar = [];
      let bestDistance = maxDistance;
      const minSimilarity = 0.4;
      candidates.forEach((candidate) => {
        if (candidate.length <= 1) return;
        const distance = editDistance(word, candidate);
        const length = Math.max(word.length, candidate.length);
        const similarity = (length - distance) / length;
        if (similarity > minSimilarity) {
          if (distance < bestDistance) {
            bestDistance = distance;
            similar = [candidate];
          } else if (distance === bestDistance) {
            similar.push(candidate);
          }
        }
      });
      similar.sort((a, b) => a.localeCompare(b));
      if (searchingOptions) {
        similar = similar.map((candidate) => `--${candidate}`);
      }
      if (similar.length > 1) {
        return `
(Did you mean one of ${similar.join(", ")}?)`;
      }
      if (similar.length === 1) {
        return `
(Did you mean ${similar[0]}?)`;
      }
      return "";
    }
    exports.suggestSimilar = suggestSimilar;
  }
});

// node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/command.js
var require_command = __commonJS({
  "node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/command.js"(exports) {
    var EventEmitter = __require("node:events").EventEmitter;
    var childProcess2 = __require("node:child_process");
    var path2 = __require("node:path");
    var fs6 = __require("node:fs");
    var process17 = __require("node:process");
    var { Argument: Argument2, humanReadableArgName } = require_argument();
    var { CommanderError: CommanderError2 } = require_error();
    var { Help: Help2 } = require_help();
    var { Option: Option2, DualOptions } = require_option();
    var { suggestSimilar } = require_suggestSimilar();
    var Command2 = class _Command extends EventEmitter {
      /**
       * Initialize a new `Command`.
       *
       * @param {string} [name]
       */
      constructor(name) {
        super();
        this.commands = [];
        this.options = [];
        this.parent = null;
        this._allowUnknownOption = false;
        this._allowExcessArguments = true;
        this.registeredArguments = [];
        this._args = this.registeredArguments;
        this.args = [];
        this.rawArgs = [];
        this.processedArgs = [];
        this._scriptPath = null;
        this._name = name || "";
        this._optionValues = {};
        this._optionValueSources = {};
        this._storeOptionsAsProperties = false;
        this._actionHandler = null;
        this._executableHandler = false;
        this._executableFile = null;
        this._executableDir = null;
        this._defaultCommandName = null;
        this._exitCallback = null;
        this._aliases = [];
        this._combineFlagAndOptionalValue = true;
        this._description = "";
        this._summary = "";
        this._argsDescription = void 0;
        this._enablePositionalOptions = false;
        this._passThroughOptions = false;
        this._lifeCycleHooks = {};
        this._showHelpAfterError = false;
        this._showSuggestionAfterError = true;
        this._outputConfiguration = {
          writeOut: (str2) => process17.stdout.write(str2),
          writeErr: (str2) => process17.stderr.write(str2),
          getOutHelpWidth: () => process17.stdout.isTTY ? process17.stdout.columns : void 0,
          getErrHelpWidth: () => process17.stderr.isTTY ? process17.stderr.columns : void 0,
          outputError: (str2, write) => write(str2)
        };
        this._hidden = false;
        this._helpOption = void 0;
        this._addImplicitHelpCommand = void 0;
        this._helpCommand = void 0;
        this._helpConfiguration = {};
      }
      /**
       * Copy settings that are useful to have in common across root command and subcommands.
       *
       * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
       *
       * @param {Command} sourceCommand
       * @return {Command} `this` command for chaining
       */
      copyInheritedSettings(sourceCommand) {
        this._outputConfiguration = sourceCommand._outputConfiguration;
        this._helpOption = sourceCommand._helpOption;
        this._helpCommand = sourceCommand._helpCommand;
        this._helpConfiguration = sourceCommand._helpConfiguration;
        this._exitCallback = sourceCommand._exitCallback;
        this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
        this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
        this._allowExcessArguments = sourceCommand._allowExcessArguments;
        this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
        this._showHelpAfterError = sourceCommand._showHelpAfterError;
        this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
        return this;
      }
      /**
       * @returns {Command[]}
       * @private
       */
      _getCommandAndAncestors() {
        const result = [];
        for (let command = this; command; command = command.parent) {
          result.push(command);
        }
        return result;
      }
      /**
       * Define a command.
       *
       * There are two styles of command: pay attention to where to put the description.
       *
       * @example
       * // Command implemented using action handler (description is supplied separately to `.command`)
       * program
       *   .command('clone <source> [destination]')
       *   .description('clone a repository into a newly created directory')
       *   .action((source, destination) => {
       *     console.log('clone command called');
       *   });
       *
       * // Command implemented using separate executable file (description is second parameter to `.command`)
       * program
       *   .command('start <service>', 'start named service')
       *   .command('stop [service]', 'stop named service, or all if no name supplied');
       *
       * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
       * @param {(object | string)} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
       * @param {object} [execOpts] - configuration options (for executable)
       * @return {Command} returns new command for action handler, or `this` for executable command
       */
      command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
        let desc = actionOptsOrExecDesc;
        let opts = execOpts;
        if (typeof desc === "object" && desc !== null) {
          opts = desc;
          desc = null;
        }
        opts = opts || {};
        const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
        const cmd = this.createCommand(name);
        if (desc) {
          cmd.description(desc);
          cmd._executableHandler = true;
        }
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        cmd._hidden = !!(opts.noHelp || opts.hidden);
        cmd._executableFile = opts.executableFile || null;
        if (args) cmd.arguments(args);
        this._registerCommand(cmd);
        cmd.parent = this;
        cmd.copyInheritedSettings(this);
        if (desc) return this;
        return cmd;
      }
      /**
       * Factory routine to create a new unattached command.
       *
       * See .command() for creating an attached subcommand, which uses this routine to
       * create the command. You can override createCommand to customise subcommands.
       *
       * @param {string} [name]
       * @return {Command} new command
       */
      createCommand(name) {
        return new _Command(name);
      }
      /**
       * You can customise the help with a subclass of Help by overriding createHelp,
       * or by overriding Help properties using configureHelp().
       *
       * @return {Help}
       */
      createHelp() {
        return Object.assign(new Help2(), this.configureHelp());
      }
      /**
       * You can customise the help by overriding Help properties using configureHelp(),
       * or with a subclass of Help by overriding createHelp().
       *
       * @param {object} [configuration] - configuration options
       * @return {(Command | object)} `this` command for chaining, or stored configuration
       */
      configureHelp(configuration) {
        if (configuration === void 0) return this._helpConfiguration;
        this._helpConfiguration = configuration;
        return this;
      }
      /**
       * The default output goes to stdout and stderr. You can customise this for special
       * applications. You can also customise the display of errors by overriding outputError.
       *
       * The configuration properties are all functions:
       *
       *     // functions to change where being written, stdout and stderr
       *     writeOut(str)
       *     writeErr(str)
       *     // matching functions to specify width for wrapping help
       *     getOutHelpWidth()
       *     getErrHelpWidth()
       *     // functions based on what is being written out
       *     outputError(str, write) // used for displaying errors, and not used for displaying help
       *
       * @param {object} [configuration] - configuration options
       * @return {(Command | object)} `this` command for chaining, or stored configuration
       */
      configureOutput(configuration) {
        if (configuration === void 0) return this._outputConfiguration;
        Object.assign(this._outputConfiguration, configuration);
        return this;
      }
      /**
       * Display the help or a custom message after an error occurs.
       *
       * @param {(boolean|string)} [displayHelp]
       * @return {Command} `this` command for chaining
       */
      showHelpAfterError(displayHelp = true) {
        if (typeof displayHelp !== "string") displayHelp = !!displayHelp;
        this._showHelpAfterError = displayHelp;
        return this;
      }
      /**
       * Display suggestion of similar commands for unknown commands, or options for unknown options.
       *
       * @param {boolean} [displaySuggestion]
       * @return {Command} `this` command for chaining
       */
      showSuggestionAfterError(displaySuggestion = true) {
        this._showSuggestionAfterError = !!displaySuggestion;
        return this;
      }
      /**
       * Add a prepared subcommand.
       *
       * See .command() for creating an attached subcommand which inherits settings from its parent.
       *
       * @param {Command} cmd - new subcommand
       * @param {object} [opts] - configuration options
       * @return {Command} `this` command for chaining
       */
      addCommand(cmd, opts) {
        if (!cmd._name) {
          throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
        }
        opts = opts || {};
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        if (opts.noHelp || opts.hidden) cmd._hidden = true;
        this._registerCommand(cmd);
        cmd.parent = this;
        cmd._checkForBrokenPassThrough();
        return this;
      }
      /**
       * Factory routine to create a new unattached argument.
       *
       * See .argument() for creating an attached argument, which uses this routine to
       * create the argument. You can override createArgument to return a custom argument.
       *
       * @param {string} name
       * @param {string} [description]
       * @return {Argument} new argument
       */
      createArgument(name, description) {
        return new Argument2(name, description);
      }
      /**
       * Define argument syntax for command.
       *
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @example
       * program.argument('<input-file>');
       * program.argument('[output-file]');
       *
       * @param {string} name
       * @param {string} [description]
       * @param {(Function|*)} [fn] - custom argument processing function
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      argument(name, description, fn, defaultValue) {
        const argument = this.createArgument(name, description);
        if (typeof fn === "function") {
          argument.default(defaultValue).argParser(fn);
        } else {
          argument.default(fn);
        }
        this.addArgument(argument);
        return this;
      }
      /**
       * Define argument syntax for command, adding multiple at once (without descriptions).
       *
       * See also .argument().
       *
       * @example
       * program.arguments('<cmd> [env]');
       *
       * @param {string} names
       * @return {Command} `this` command for chaining
       */
      arguments(names) {
        names.trim().split(/ +/).forEach((detail) => {
          this.argument(detail);
        });
        return this;
      }
      /**
       * Define argument syntax for command, adding a prepared argument.
       *
       * @param {Argument} argument
       * @return {Command} `this` command for chaining
       */
      addArgument(argument) {
        const previousArgument = this.registeredArguments.slice(-1)[0];
        if (previousArgument && previousArgument.variadic) {
          throw new Error(
            `only the last argument can be variadic '${previousArgument.name()}'`
          );
        }
        if (argument.required && argument.defaultValue !== void 0 && argument.parseArg === void 0) {
          throw new Error(
            `a default value for a required argument is never used: '${argument.name()}'`
          );
        }
        this.registeredArguments.push(argument);
        return this;
      }
      /**
       * Customise or override default help command. By default a help command is automatically added if your command has subcommands.
       *
       * @example
       *    program.helpCommand('help [cmd]');
       *    program.helpCommand('help [cmd]', 'show help');
       *    program.helpCommand(false); // suppress default help command
       *    program.helpCommand(true); // add help command even if no subcommands
       *
       * @param {string|boolean} enableOrNameAndArgs - enable with custom name and/or arguments, or boolean to override whether added
       * @param {string} [description] - custom description
       * @return {Command} `this` command for chaining
       */
      helpCommand(enableOrNameAndArgs, description) {
        if (typeof enableOrNameAndArgs === "boolean") {
          this._addImplicitHelpCommand = enableOrNameAndArgs;
          return this;
        }
        enableOrNameAndArgs = enableOrNameAndArgs ?? "help [command]";
        const [, helpName, helpArgs] = enableOrNameAndArgs.match(/([^ ]+) *(.*)/);
        const helpDescription = description ?? "display help for command";
        const helpCommand = this.createCommand(helpName);
        helpCommand.helpOption(false);
        if (helpArgs) helpCommand.arguments(helpArgs);
        if (helpDescription) helpCommand.description(helpDescription);
        this._addImplicitHelpCommand = true;
        this._helpCommand = helpCommand;
        return this;
      }
      /**
       * Add prepared custom help command.
       *
       * @param {(Command|string|boolean)} helpCommand - custom help command, or deprecated enableOrNameAndArgs as for `.helpCommand()`
       * @param {string} [deprecatedDescription] - deprecated custom description used with custom name only
       * @return {Command} `this` command for chaining
       */
      addHelpCommand(helpCommand, deprecatedDescription) {
        if (typeof helpCommand !== "object") {
          this.helpCommand(helpCommand, deprecatedDescription);
          return this;
        }
        this._addImplicitHelpCommand = true;
        this._helpCommand = helpCommand;
        return this;
      }
      /**
       * Lazy create help command.
       *
       * @return {(Command|null)}
       * @package
       */
      _getHelpCommand() {
        const hasImplicitHelpCommand = this._addImplicitHelpCommand ?? (this.commands.length && !this._actionHandler && !this._findCommand("help"));
        if (hasImplicitHelpCommand) {
          if (this._helpCommand === void 0) {
            this.helpCommand(void 0, void 0);
          }
          return this._helpCommand;
        }
        return null;
      }
      /**
       * Add hook for life cycle event.
       *
       * @param {string} event
       * @param {Function} listener
       * @return {Command} `this` command for chaining
       */
      hook(event, listener) {
        const allowedValues = ["preSubcommand", "preAction", "postAction"];
        if (!allowedValues.includes(event)) {
          throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        if (this._lifeCycleHooks[event]) {
          this._lifeCycleHooks[event].push(listener);
        } else {
          this._lifeCycleHooks[event] = [listener];
        }
        return this;
      }
      /**
       * Register callback to use as replacement for calling process.exit.
       *
       * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
       * @return {Command} `this` command for chaining
       */
      exitOverride(fn) {
        if (fn) {
          this._exitCallback = fn;
        } else {
          this._exitCallback = (err) => {
            if (err.code !== "commander.executeSubCommandAsync") {
              throw err;
            } else {
            }
          };
        }
        return this;
      }
      /**
       * Call process.exit, and _exitCallback if defined.
       *
       * @param {number} exitCode exit code for using with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       * @return never
       * @private
       */
      _exit(exitCode, code, message) {
        if (this._exitCallback) {
          this._exitCallback(new CommanderError2(exitCode, code, message));
        }
        process17.exit(exitCode);
      }
      /**
       * Register callback `fn` for the command.
       *
       * @example
       * program
       *   .command('serve')
       *   .description('start service')
       *   .action(function() {
       *      // do work here
       *   });
       *
       * @param {Function} fn
       * @return {Command} `this` command for chaining
       */
      action(fn) {
        const listener = (args) => {
          const expectedArgsCount = this.registeredArguments.length;
          const actionArgs = args.slice(0, expectedArgsCount);
          if (this._storeOptionsAsProperties) {
            actionArgs[expectedArgsCount] = this;
          } else {
            actionArgs[expectedArgsCount] = this.opts();
          }
          actionArgs.push(this);
          return fn.apply(this, actionArgs);
        };
        this._actionHandler = listener;
        return this;
      }
      /**
       * Factory routine to create a new unattached option.
       *
       * See .option() for creating an attached option, which uses this routine to
       * create the option. You can override createOption to return a custom option.
       *
       * @param {string} flags
       * @param {string} [description]
       * @return {Option} new option
       */
      createOption(flags, description) {
        return new Option2(flags, description);
      }
      /**
       * Wrap parseArgs to catch 'commander.invalidArgument'.
       *
       * @param {(Option | Argument)} target
       * @param {string} value
       * @param {*} previous
       * @param {string} invalidArgumentMessage
       * @private
       */
      _callParseArg(target, value, previous, invalidArgumentMessage) {
        try {
          return target.parseArg(value, previous);
        } catch (err) {
          if (err.code === "commander.invalidArgument") {
            const message = `${invalidArgumentMessage} ${err.message}`;
            this.error(message, { exitCode: err.exitCode, code: err.code });
          }
          throw err;
        }
      }
      /**
       * Check for option flag conflicts.
       * Register option if no conflicts found, or throw on conflict.
       *
       * @param {Option} option
       * @private
       */
      _registerOption(option) {
        const matchingOption = option.short && this._findOption(option.short) || option.long && this._findOption(option.long);
        if (matchingOption) {
          const matchingFlag = option.long && this._findOption(option.long) ? option.long : option.short;
          throw new Error(`Cannot add option '${option.flags}'${this._name && ` to command '${this._name}'`} due to conflicting flag '${matchingFlag}'
-  already used by option '${matchingOption.flags}'`);
        }
        this.options.push(option);
      }
      /**
       * Check for command name and alias conflicts with existing commands.
       * Register command if no conflicts found, or throw on conflict.
       *
       * @param {Command} command
       * @private
       */
      _registerCommand(command) {
        const knownBy = (cmd) => {
          return [cmd.name()].concat(cmd.aliases());
        };
        const alreadyUsed = knownBy(command).find(
          (name) => this._findCommand(name)
        );
        if (alreadyUsed) {
          const existingCmd = knownBy(this._findCommand(alreadyUsed)).join("|");
          const newCmd = knownBy(command).join("|");
          throw new Error(
            `cannot add command '${newCmd}' as already have command '${existingCmd}'`
          );
        }
        this.commands.push(command);
      }
      /**
       * Add an option.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addOption(option) {
        this._registerOption(option);
        const oname = option.name();
        const name = option.attributeName();
        if (option.negate) {
          const positiveLongFlag = option.long.replace(/^--no-/, "--");
          if (!this._findOption(positiveLongFlag)) {
            this.setOptionValueWithSource(
              name,
              option.defaultValue === void 0 ? true : option.defaultValue,
              "default"
            );
          }
        } else if (option.defaultValue !== void 0) {
          this.setOptionValueWithSource(name, option.defaultValue, "default");
        }
        const handleOptionValue = (val, invalidValueMessage, valueSource) => {
          if (val == null && option.presetArg !== void 0) {
            val = option.presetArg;
          }
          const oldValue = this.getOptionValue(name);
          if (val !== null && option.parseArg) {
            val = this._callParseArg(option, val, oldValue, invalidValueMessage);
          } else if (val !== null && option.variadic) {
            val = option._concatValue(val, oldValue);
          }
          if (val == null) {
            if (option.negate) {
              val = false;
            } else if (option.isBoolean() || option.optional) {
              val = true;
            } else {
              val = "";
            }
          }
          this.setOptionValueWithSource(name, val, valueSource);
        };
        this.on("option:" + oname, (val) => {
          const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
          handleOptionValue(val, invalidValueMessage, "cli");
        });
        if (option.envVar) {
          this.on("optionEnv:" + oname, (val) => {
            const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
            handleOptionValue(val, invalidValueMessage, "env");
          });
        }
        return this;
      }
      /**
       * Internal implementation shared by .option() and .requiredOption()
       *
       * @return {Command} `this` command for chaining
       * @private
       */
      _optionEx(config, flags, description, fn, defaultValue) {
        if (typeof flags === "object" && flags instanceof Option2) {
          throw new Error(
            "To add an Option object use addOption() instead of option() or requiredOption()"
          );
        }
        const option = this.createOption(flags, description);
        option.makeOptionMandatory(!!config.mandatory);
        if (typeof fn === "function") {
          option.default(defaultValue).argParser(fn);
        } else if (fn instanceof RegExp) {
          const regex2 = fn;
          fn = (val, def) => {
            const m = regex2.exec(val);
            return m ? m[0] : def;
          };
          option.default(defaultValue).argParser(fn);
        } else {
          option.default(fn);
        }
        return this.addOption(option);
      }
      /**
       * Define option with `flags`, `description`, and optional argument parsing function or `defaultValue` or both.
       *
       * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space. A required
       * option-argument is indicated by `<>` and an optional option-argument by `[]`.
       *
       * See the README for more details, and see also addOption() and requiredOption().
       *
       * @example
       * program
       *     .option('-p, --pepper', 'add pepper')
       *     .option('-p, --pizza-type <TYPE>', 'type of pizza') // required option-argument
       *     .option('-c, --cheese [CHEESE]', 'add extra cheese', 'mozzarella') // optional option-argument with default
       *     .option('-t, --tip <VALUE>', 'add tip to purchase cost', parseFloat) // custom parse function
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {(Function|*)} [parseArg] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      option(flags, description, parseArg, defaultValue) {
        return this._optionEx({}, flags, description, parseArg, defaultValue);
      }
      /**
       * Add a required option which must have a value after parsing. This usually means
       * the option must be specified on the command line. (Otherwise the same as .option().)
       *
       * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {(Function|*)} [parseArg] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      requiredOption(flags, description, parseArg, defaultValue) {
        return this._optionEx(
          { mandatory: true },
          flags,
          description,
          parseArg,
          defaultValue
        );
      }
      /**
       * Alter parsing of short flags with optional values.
       *
       * @example
       * // for `.option('-f,--flag [value]'):
       * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
       * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
       *
       * @param {boolean} [combine] - if `true` or omitted, an optional value can be specified directly after the flag.
       * @return {Command} `this` command for chaining
       */
      combineFlagAndOptionalValue(combine = true) {
        this._combineFlagAndOptionalValue = !!combine;
        return this;
      }
      /**
       * Allow unknown options on the command line.
       *
       * @param {boolean} [allowUnknown] - if `true` or omitted, no error will be thrown for unknown options.
       * @return {Command} `this` command for chaining
       */
      allowUnknownOption(allowUnknown = true) {
        this._allowUnknownOption = !!allowUnknown;
        return this;
      }
      /**
       * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
       *
       * @param {boolean} [allowExcess] - if `true` or omitted, no error will be thrown for excess arguments.
       * @return {Command} `this` command for chaining
       */
      allowExcessArguments(allowExcess = true) {
        this._allowExcessArguments = !!allowExcess;
        return this;
      }
      /**
       * Enable positional options. Positional means global options are specified before subcommands which lets
       * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
       * The default behaviour is non-positional and global options may appear anywhere on the command line.
       *
       * @param {boolean} [positional]
       * @return {Command} `this` command for chaining
       */
      enablePositionalOptions(positional = true) {
        this._enablePositionalOptions = !!positional;
        return this;
      }
      /**
       * Pass through options that come after command-arguments rather than treat them as command-options,
       * so actual command-options come before command-arguments. Turning this on for a subcommand requires
       * positional options to have been enabled on the program (parent commands).
       * The default behaviour is non-positional and options may appear before or after command-arguments.
       *
       * @param {boolean} [passThrough] for unknown options.
       * @return {Command} `this` command for chaining
       */
      passThroughOptions(passThrough = true) {
        this._passThroughOptions = !!passThrough;
        this._checkForBrokenPassThrough();
        return this;
      }
      /**
       * @private
       */
      _checkForBrokenPassThrough() {
        if (this.parent && this._passThroughOptions && !this.parent._enablePositionalOptions) {
          throw new Error(
            `passThroughOptions cannot be used for '${this._name}' without turning on enablePositionalOptions for parent command(s)`
          );
        }
      }
      /**
       * Whether to store option values as properties on command object,
       * or store separately (specify false). In both cases the option values can be accessed using .opts().
       *
       * @param {boolean} [storeAsProperties=true]
       * @return {Command} `this` command for chaining
       */
      storeOptionsAsProperties(storeAsProperties = true) {
        if (this.options.length) {
          throw new Error("call .storeOptionsAsProperties() before adding options");
        }
        if (Object.keys(this._optionValues).length) {
          throw new Error(
            "call .storeOptionsAsProperties() before setting option values"
          );
        }
        this._storeOptionsAsProperties = !!storeAsProperties;
        return this;
      }
      /**
       * Retrieve option value.
       *
       * @param {string} key
       * @return {object} value
       */
      getOptionValue(key) {
        if (this._storeOptionsAsProperties) {
          return this[key];
        }
        return this._optionValues[key];
      }
      /**
       * Store option value.
       *
       * @param {string} key
       * @param {object} value
       * @return {Command} `this` command for chaining
       */
      setOptionValue(key, value) {
        return this.setOptionValueWithSource(key, value, void 0);
      }
      /**
       * Store option value and where the value came from.
       *
       * @param {string} key
       * @param {object} value
       * @param {string} source - expected values are default/config/env/cli/implied
       * @return {Command} `this` command for chaining
       */
      setOptionValueWithSource(key, value, source) {
        if (this._storeOptionsAsProperties) {
          this[key] = value;
        } else {
          this._optionValues[key] = value;
        }
        this._optionValueSources[key] = source;
        return this;
      }
      /**
       * Get source of option value.
       * Expected values are default | config | env | cli | implied
       *
       * @param {string} key
       * @return {string}
       */
      getOptionValueSource(key) {
        return this._optionValueSources[key];
      }
      /**
       * Get source of option value. See also .optsWithGlobals().
       * Expected values are default | config | env | cli | implied
       *
       * @param {string} key
       * @return {string}
       */
      getOptionValueSourceWithGlobals(key) {
        let source;
        this._getCommandAndAncestors().forEach((cmd) => {
          if (cmd.getOptionValueSource(key) !== void 0) {
            source = cmd.getOptionValueSource(key);
          }
        });
        return source;
      }
      /**
       * Get user arguments from implied or explicit arguments.
       * Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
       *
       * @private
       */
      _prepareUserArgs(argv, parseOptions) {
        if (argv !== void 0 && !Array.isArray(argv)) {
          throw new Error("first parameter to parse must be array or undefined");
        }
        parseOptions = parseOptions || {};
        if (argv === void 0 && parseOptions.from === void 0) {
          if (process17.versions?.electron) {
            parseOptions.from = "electron";
          }
          const execArgv = process17.execArgv ?? [];
          if (execArgv.includes("-e") || execArgv.includes("--eval") || execArgv.includes("-p") || execArgv.includes("--print")) {
            parseOptions.from = "eval";
          }
        }
        if (argv === void 0) {
          argv = process17.argv;
        }
        this.rawArgs = argv.slice();
        let userArgs;
        switch (parseOptions.from) {
          case void 0:
          case "node":
            this._scriptPath = argv[1];
            userArgs = argv.slice(2);
            break;
          case "electron":
            if (process17.defaultApp) {
              this._scriptPath = argv[1];
              userArgs = argv.slice(2);
            } else {
              userArgs = argv.slice(1);
            }
            break;
          case "user":
            userArgs = argv.slice(0);
            break;
          case "eval":
            userArgs = argv.slice(1);
            break;
          default:
            throw new Error(
              `unexpected parse option { from: '${parseOptions.from}' }`
            );
        }
        if (!this._name && this._scriptPath)
          this.nameFromFilename(this._scriptPath);
        this._name = this._name || "program";
        return userArgs;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Use parseAsync instead of parse if any of your action handlers are async.
       *
       * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
       *
       * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
       * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
       * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
       * - `'user'`: just user arguments
       *
       * @example
       * program.parse(); // parse process.argv and auto-detect electron and special node flags
       * program.parse(process.argv); // assume argv[0] is app and argv[1] is script
       * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv] - optional, defaults to process.argv
       * @param {object} [parseOptions] - optionally specify style of options with from: node/user/electron
       * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
       * @return {Command} `this` command for chaining
       */
      parse(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        this._parseCommand([], userArgs);
        return this;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
       *
       * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
       * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
       * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
       * - `'user'`: just user arguments
       *
       * @example
       * await program.parseAsync(); // parse process.argv and auto-detect electron and special node flags
       * await program.parseAsync(process.argv); // assume argv[0] is app and argv[1] is script
       * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv]
       * @param {object} [parseOptions]
       * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
       * @return {Promise}
       */
      async parseAsync(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        await this._parseCommand([], userArgs);
        return this;
      }
      /**
       * Execute a sub-command executable.
       *
       * @private
       */
      _executeSubCommand(subcommand, args) {
        args = args.slice();
        let launchWithNode = false;
        const sourceExt = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
        function findFile(baseDir, baseName) {
          const localBin = path2.resolve(baseDir, baseName);
          if (fs6.existsSync(localBin)) return localBin;
          if (sourceExt.includes(path2.extname(baseName))) return void 0;
          const foundExt = sourceExt.find(
            (ext) => fs6.existsSync(`${localBin}${ext}`)
          );
          if (foundExt) return `${localBin}${foundExt}`;
          return void 0;
        }
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
        let executableDir = this._executableDir || "";
        if (this._scriptPath) {
          let resolvedScriptPath;
          try {
            resolvedScriptPath = fs6.realpathSync(this._scriptPath);
          } catch (err) {
            resolvedScriptPath = this._scriptPath;
          }
          executableDir = path2.resolve(
            path2.dirname(resolvedScriptPath),
            executableDir
          );
        }
        if (executableDir) {
          let localFile = findFile(executableDir, executableFile);
          if (!localFile && !subcommand._executableFile && this._scriptPath) {
            const legacyName = path2.basename(
              this._scriptPath,
              path2.extname(this._scriptPath)
            );
            if (legacyName !== this._name) {
              localFile = findFile(
                executableDir,
                `${legacyName}-${subcommand._name}`
              );
            }
          }
          executableFile = localFile || executableFile;
        }
        launchWithNode = sourceExt.includes(path2.extname(executableFile));
        let proc;
        if (process17.platform !== "win32") {
          if (launchWithNode) {
            args.unshift(executableFile);
            args = incrementNodeInspectorPort(process17.execArgv).concat(args);
            proc = childProcess2.spawn(process17.argv[0], args, { stdio: "inherit" });
          } else {
            proc = childProcess2.spawn(executableFile, args, { stdio: "inherit" });
          }
        } else {
          args.unshift(executableFile);
          args = incrementNodeInspectorPort(process17.execArgv).concat(args);
          proc = childProcess2.spawn(process17.execPath, args, { stdio: "inherit" });
        }
        if (!proc.killed) {
          const signals2 = ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"];
          signals2.forEach((signal) => {
            process17.on(signal, () => {
              if (proc.killed === false && proc.exitCode === null) {
                proc.kill(signal);
              }
            });
          });
        }
        const exitCallback = this._exitCallback;
        proc.on("close", (code) => {
          code = code ?? 1;
          if (!exitCallback) {
            process17.exit(code);
          } else {
            exitCallback(
              new CommanderError2(
                code,
                "commander.executeSubCommandAsync",
                "(close)"
              )
            );
          }
        });
        proc.on("error", (err) => {
          if (err.code === "ENOENT") {
            const executableDirMessage = executableDir ? `searched for local subcommand relative to directory '${executableDir}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory";
            const executableMissing = `'${executableFile}' does not exist
 - if '${subcommand._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
            throw new Error(executableMissing);
          } else if (err.code === "EACCES") {
            throw new Error(`'${executableFile}' not executable`);
          }
          if (!exitCallback) {
            process17.exit(1);
          } else {
            const wrappedError = new CommanderError2(
              1,
              "commander.executeSubCommandAsync",
              "(error)"
            );
            wrappedError.nestedError = err;
            exitCallback(wrappedError);
          }
        });
        this.runningCommand = proc;
      }
      /**
       * @private
       */
      _dispatchSubcommand(commandName, operands, unknown) {
        const subCommand = this._findCommand(commandName);
        if (!subCommand) this.help({ error: true });
        let promiseChain;
        promiseChain = this._chainOrCallSubCommandHook(
          promiseChain,
          subCommand,
          "preSubcommand"
        );
        promiseChain = this._chainOrCall(promiseChain, () => {
          if (subCommand._executableHandler) {
            this._executeSubCommand(subCommand, operands.concat(unknown));
          } else {
            return subCommand._parseCommand(operands, unknown);
          }
        });
        return promiseChain;
      }
      /**
       * Invoke help directly if possible, or dispatch if necessary.
       * e.g. help foo
       *
       * @private
       */
      _dispatchHelpCommand(subcommandName) {
        if (!subcommandName) {
          this.help();
        }
        const subCommand = this._findCommand(subcommandName);
        if (subCommand && !subCommand._executableHandler) {
          subCommand.help();
        }
        return this._dispatchSubcommand(
          subcommandName,
          [],
          [this._getHelpOption()?.long ?? this._getHelpOption()?.short ?? "--help"]
        );
      }
      /**
       * Check this.args against expected this.registeredArguments.
       *
       * @private
       */
      _checkNumberOfArguments() {
        this.registeredArguments.forEach((arg, i) => {
          if (arg.required && this.args[i] == null) {
            this.missingArgument(arg.name());
          }
        });
        if (this.registeredArguments.length > 0 && this.registeredArguments[this.registeredArguments.length - 1].variadic) {
          return;
        }
        if (this.args.length > this.registeredArguments.length) {
          this._excessArguments(this.args);
        }
      }
      /**
       * Process this.args using this.registeredArguments and save as this.processedArgs!
       *
       * @private
       */
      _processArguments() {
        const myParseArg = (argument, value, previous) => {
          let parsedValue = value;
          if (value !== null && argument.parseArg) {
            const invalidValueMessage = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'.`;
            parsedValue = this._callParseArg(
              argument,
              value,
              previous,
              invalidValueMessage
            );
          }
          return parsedValue;
        };
        this._checkNumberOfArguments();
        const processedArgs = [];
        this.registeredArguments.forEach((declaredArg, index) => {
          let value = declaredArg.defaultValue;
          if (declaredArg.variadic) {
            if (index < this.args.length) {
              value = this.args.slice(index);
              if (declaredArg.parseArg) {
                value = value.reduce((processed, v) => {
                  return myParseArg(declaredArg, v, processed);
                }, declaredArg.defaultValue);
              }
            } else if (value === void 0) {
              value = [];
            }
          } else if (index < this.args.length) {
            value = this.args[index];
            if (declaredArg.parseArg) {
              value = myParseArg(declaredArg, value, declaredArg.defaultValue);
            }
          }
          processedArgs[index] = value;
        });
        this.processedArgs = processedArgs;
      }
      /**
       * Once we have a promise we chain, but call synchronously until then.
       *
       * @param {(Promise|undefined)} promise
       * @param {Function} fn
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCall(promise, fn) {
        if (promise && promise.then && typeof promise.then === "function") {
          return promise.then(() => fn());
        }
        return fn();
      }
      /**
       *
       * @param {(Promise|undefined)} promise
       * @param {string} event
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCallHooks(promise, event) {
        let result = promise;
        const hooks = [];
        this._getCommandAndAncestors().reverse().filter((cmd) => cmd._lifeCycleHooks[event] !== void 0).forEach((hookedCommand) => {
          hookedCommand._lifeCycleHooks[event].forEach((callback) => {
            hooks.push({ hookedCommand, callback });
          });
        });
        if (event === "postAction") {
          hooks.reverse();
        }
        hooks.forEach((hookDetail) => {
          result = this._chainOrCall(result, () => {
            return hookDetail.callback(hookDetail.hookedCommand, this);
          });
        });
        return result;
      }
      /**
       *
       * @param {(Promise|undefined)} promise
       * @param {Command} subCommand
       * @param {string} event
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCallSubCommandHook(promise, subCommand, event) {
        let result = promise;
        if (this._lifeCycleHooks[event] !== void 0) {
          this._lifeCycleHooks[event].forEach((hook) => {
            result = this._chainOrCall(result, () => {
              return hook(this, subCommand);
            });
          });
        }
        return result;
      }
      /**
       * Process arguments in context of this command.
       * Returns action result, in case it is a promise.
       *
       * @private
       */
      _parseCommand(operands, unknown) {
        const parsed = this.parseOptions(unknown);
        this._parseOptionsEnv();
        this._parseOptionsImplied();
        operands = operands.concat(parsed.operands);
        unknown = parsed.unknown;
        this.args = operands.concat(unknown);
        if (operands && this._findCommand(operands[0])) {
          return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
        }
        if (this._getHelpCommand() && operands[0] === this._getHelpCommand().name()) {
          return this._dispatchHelpCommand(operands[1]);
        }
        if (this._defaultCommandName) {
          this._outputHelpIfRequested(unknown);
          return this._dispatchSubcommand(
            this._defaultCommandName,
            operands,
            unknown
          );
        }
        if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
          this.help({ error: true });
        }
        this._outputHelpIfRequested(parsed.unknown);
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        const checkForUnknownOptions = () => {
          if (parsed.unknown.length > 0) {
            this.unknownOption(parsed.unknown[0]);
          }
        };
        const commandEvent = `command:${this.name()}`;
        if (this._actionHandler) {
          checkForUnknownOptions();
          this._processArguments();
          let promiseChain;
          promiseChain = this._chainOrCallHooks(promiseChain, "preAction");
          promiseChain = this._chainOrCall(
            promiseChain,
            () => this._actionHandler(this.processedArgs)
          );
          if (this.parent) {
            promiseChain = this._chainOrCall(promiseChain, () => {
              this.parent.emit(commandEvent, operands, unknown);
            });
          }
          promiseChain = this._chainOrCallHooks(promiseChain, "postAction");
          return promiseChain;
        }
        if (this.parent && this.parent.listenerCount(commandEvent)) {
          checkForUnknownOptions();
          this._processArguments();
          this.parent.emit(commandEvent, operands, unknown);
        } else if (operands.length) {
          if (this._findCommand("*")) {
            return this._dispatchSubcommand("*", operands, unknown);
          }
          if (this.listenerCount("command:*")) {
            this.emit("command:*", operands, unknown);
          } else if (this.commands.length) {
            this.unknownCommand();
          } else {
            checkForUnknownOptions();
            this._processArguments();
          }
        } else if (this.commands.length) {
          checkForUnknownOptions();
          this.help({ error: true });
        } else {
          checkForUnknownOptions();
          this._processArguments();
        }
      }
      /**
       * Find matching command.
       *
       * @private
       * @return {Command | undefined}
       */
      _findCommand(name) {
        if (!name) return void 0;
        return this.commands.find(
          (cmd) => cmd._name === name || cmd._aliases.includes(name)
        );
      }
      /**
       * Return an option matching `arg` if any.
       *
       * @param {string} arg
       * @return {Option}
       * @package
       */
      _findOption(arg) {
        return this.options.find((option) => option.is(arg));
      }
      /**
       * Display an error message if a mandatory option does not have a value.
       * Called after checking for help flags in leaf subcommand.
       *
       * @private
       */
      _checkForMissingMandatoryOptions() {
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd.options.forEach((anOption) => {
            if (anOption.mandatory && cmd.getOptionValue(anOption.attributeName()) === void 0) {
              cmd.missingMandatoryOptionValue(anOption);
            }
          });
        });
      }
      /**
       * Display an error message if conflicting options are used together in this.
       *
       * @private
       */
      _checkForConflictingLocalOptions() {
        const definedNonDefaultOptions = this.options.filter((option) => {
          const optionKey = option.attributeName();
          if (this.getOptionValue(optionKey) === void 0) {
            return false;
          }
          return this.getOptionValueSource(optionKey) !== "default";
        });
        const optionsWithConflicting = definedNonDefaultOptions.filter(
          (option) => option.conflictsWith.length > 0
        );
        optionsWithConflicting.forEach((option) => {
          const conflictingAndDefined = definedNonDefaultOptions.find(
            (defined) => option.conflictsWith.includes(defined.attributeName())
          );
          if (conflictingAndDefined) {
            this._conflictingOption(option, conflictingAndDefined);
          }
        });
      }
      /**
       * Display an error message if conflicting options are used together.
       * Called after checking for help flags in leaf subcommand.
       *
       * @private
       */
      _checkForConflictingOptions() {
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd._checkForConflictingLocalOptions();
        });
      }
      /**
       * Parse options from `argv` removing known options,
       * and return argv split into operands and unknown arguments.
       *
       * Examples:
       *
       *     argv => operands, unknown
       *     --known kkk op => [op], []
       *     op --known kkk => [op], []
       *     sub --unknown uuu op => [sub], [--unknown uuu op]
       *     sub -- --unknown uuu op => [sub --unknown uuu op], []
       *
       * @param {string[]} argv
       * @return {{operands: string[], unknown: string[]}}
       */
      parseOptions(argv) {
        const operands = [];
        const unknown = [];
        let dest = operands;
        const args = argv.slice();
        function maybeOption(arg) {
          return arg.length > 1 && arg[0] === "-";
        }
        let activeVariadicOption = null;
        while (args.length) {
          const arg = args.shift();
          if (arg === "--") {
            if (dest === unknown) dest.push(arg);
            dest.push(...args);
            break;
          }
          if (activeVariadicOption && !maybeOption(arg)) {
            this.emit(`option:${activeVariadicOption.name()}`, arg);
            continue;
          }
          activeVariadicOption = null;
          if (maybeOption(arg)) {
            const option = this._findOption(arg);
            if (option) {
              if (option.required) {
                const value = args.shift();
                if (value === void 0) this.optionMissingArgument(option);
                this.emit(`option:${option.name()}`, value);
              } else if (option.optional) {
                let value = null;
                if (args.length > 0 && !maybeOption(args[0])) {
                  value = args.shift();
                }
                this.emit(`option:${option.name()}`, value);
              } else {
                this.emit(`option:${option.name()}`);
              }
              activeVariadicOption = option.variadic ? option : null;
              continue;
            }
          }
          if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
            const option = this._findOption(`-${arg[1]}`);
            if (option) {
              if (option.required || option.optional && this._combineFlagAndOptionalValue) {
                this.emit(`option:${option.name()}`, arg.slice(2));
              } else {
                this.emit(`option:${option.name()}`);
                args.unshift(`-${arg.slice(2)}`);
              }
              continue;
            }
          }
          if (/^--[^=]+=/.test(arg)) {
            const index = arg.indexOf("=");
            const option = this._findOption(arg.slice(0, index));
            if (option && (option.required || option.optional)) {
              this.emit(`option:${option.name()}`, arg.slice(index + 1));
              continue;
            }
          }
          if (maybeOption(arg)) {
            dest = unknown;
          }
          if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
            if (this._findCommand(arg)) {
              operands.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            } else if (this._getHelpCommand() && arg === this._getHelpCommand().name()) {
              operands.push(arg);
              if (args.length > 0) operands.push(...args);
              break;
            } else if (this._defaultCommandName) {
              unknown.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            }
          }
          if (this._passThroughOptions) {
            dest.push(arg);
            if (args.length > 0) dest.push(...args);
            break;
          }
          dest.push(arg);
        }
        return { operands, unknown };
      }
      /**
       * Return an object containing local option values as key-value pairs.
       *
       * @return {object}
       */
      opts() {
        if (this._storeOptionsAsProperties) {
          const result = {};
          const len = this.options.length;
          for (let i = 0; i < len; i++) {
            const key = this.options[i].attributeName();
            result[key] = key === this._versionOptionName ? this._version : this[key];
          }
          return result;
        }
        return this._optionValues;
      }
      /**
       * Return an object containing merged local and global option values as key-value pairs.
       *
       * @return {object}
       */
      optsWithGlobals() {
        return this._getCommandAndAncestors().reduce(
          (combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()),
          {}
        );
      }
      /**
       * Display error message and exit (or call exitOverride).
       *
       * @param {string} message
       * @param {object} [errorOptions]
       * @param {string} [errorOptions.code] - an id string representing the error
       * @param {number} [errorOptions.exitCode] - used with process.exit
       */
      error(message, errorOptions) {
        this._outputConfiguration.outputError(
          `${message}
`,
          this._outputConfiguration.writeErr
        );
        if (typeof this._showHelpAfterError === "string") {
          this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`);
        } else if (this._showHelpAfterError) {
          this._outputConfiguration.writeErr("\n");
          this.outputHelp({ error: true });
        }
        const config = errorOptions || {};
        const exitCode = config.exitCode || 1;
        const code = config.code || "commander.error";
        this._exit(exitCode, code, message);
      }
      /**
       * Apply any option related environment variables, if option does
       * not have a value from cli or client code.
       *
       * @private
       */
      _parseOptionsEnv() {
        this.options.forEach((option) => {
          if (option.envVar && option.envVar in process17.env) {
            const optionKey = option.attributeName();
            if (this.getOptionValue(optionKey) === void 0 || ["default", "config", "env"].includes(
              this.getOptionValueSource(optionKey)
            )) {
              if (option.required || option.optional) {
                this.emit(`optionEnv:${option.name()}`, process17.env[option.envVar]);
              } else {
                this.emit(`optionEnv:${option.name()}`);
              }
            }
          }
        });
      }
      /**
       * Apply any implied option values, if option is undefined or default value.
       *
       * @private
       */
      _parseOptionsImplied() {
        const dualHelper = new DualOptions(this.options);
        const hasCustomOptionValue = (optionKey) => {
          return this.getOptionValue(optionKey) !== void 0 && !["default", "implied"].includes(this.getOptionValueSource(optionKey));
        };
        this.options.filter(
          (option) => option.implied !== void 0 && hasCustomOptionValue(option.attributeName()) && dualHelper.valueFromOption(
            this.getOptionValue(option.attributeName()),
            option
          )
        ).forEach((option) => {
          Object.keys(option.implied).filter((impliedKey) => !hasCustomOptionValue(impliedKey)).forEach((impliedKey) => {
            this.setOptionValueWithSource(
              impliedKey,
              option.implied[impliedKey],
              "implied"
            );
          });
        });
      }
      /**
       * Argument `name` is missing.
       *
       * @param {string} name
       * @private
       */
      missingArgument(name) {
        const message = `error: missing required argument '${name}'`;
        this.error(message, { code: "commander.missingArgument" });
      }
      /**
       * `Option` is missing an argument.
       *
       * @param {Option} option
       * @private
       */
      optionMissingArgument(option) {
        const message = `error: option '${option.flags}' argument missing`;
        this.error(message, { code: "commander.optionMissingArgument" });
      }
      /**
       * `Option` does not have a value, and is a mandatory option.
       *
       * @param {Option} option
       * @private
       */
      missingMandatoryOptionValue(option) {
        const message = `error: required option '${option.flags}' not specified`;
        this.error(message, { code: "commander.missingMandatoryOptionValue" });
      }
      /**
       * `Option` conflicts with another option.
       *
       * @param {Option} option
       * @param {Option} conflictingOption
       * @private
       */
      _conflictingOption(option, conflictingOption) {
        const findBestOptionFromValue = (option2) => {
          const optionKey = option2.attributeName();
          const optionValue = this.getOptionValue(optionKey);
          const negativeOption = this.options.find(
            (target) => target.negate && optionKey === target.attributeName()
          );
          const positiveOption = this.options.find(
            (target) => !target.negate && optionKey === target.attributeName()
          );
          if (negativeOption && (negativeOption.presetArg === void 0 && optionValue === false || negativeOption.presetArg !== void 0 && optionValue === negativeOption.presetArg)) {
            return negativeOption;
          }
          return positiveOption || option2;
        };
        const getErrorMessage = (option2) => {
          const bestOption = findBestOptionFromValue(option2);
          const optionKey = bestOption.attributeName();
          const source = this.getOptionValueSource(optionKey);
          if (source === "env") {
            return `environment variable '${bestOption.envVar}'`;
          }
          return `option '${bestOption.flags}'`;
        };
        const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
        this.error(message, { code: "commander.conflictingOption" });
      }
      /**
       * Unknown option `flag`.
       *
       * @param {string} flag
       * @private
       */
      unknownOption(flag) {
        if (this._allowUnknownOption) return;
        let suggestion = "";
        if (flag.startsWith("--") && this._showSuggestionAfterError) {
          let candidateFlags = [];
          let command = this;
          do {
            const moreFlags = command.createHelp().visibleOptions(command).filter((option) => option.long).map((option) => option.long);
            candidateFlags = candidateFlags.concat(moreFlags);
            command = command.parent;
          } while (command && !command._enablePositionalOptions);
          suggestion = suggestSimilar(flag, candidateFlags);
        }
        const message = `error: unknown option '${flag}'${suggestion}`;
        this.error(message, { code: "commander.unknownOption" });
      }
      /**
       * Excess arguments, more than expected.
       *
       * @param {string[]} receivedArgs
       * @private
       */
      _excessArguments(receivedArgs) {
        if (this._allowExcessArguments) return;
        const expected = this.registeredArguments.length;
        const s = expected === 1 ? "" : "s";
        const forSubcommand = this.parent ? ` for '${this.name()}'` : "";
        const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
        this.error(message, { code: "commander.excessArguments" });
      }
      /**
       * Unknown command.
       *
       * @private
       */
      unknownCommand() {
        const unknownName = this.args[0];
        let suggestion = "";
        if (this._showSuggestionAfterError) {
          const candidateNames = [];
          this.createHelp().visibleCommands(this).forEach((command) => {
            candidateNames.push(command.name());
            if (command.alias()) candidateNames.push(command.alias());
          });
          suggestion = suggestSimilar(unknownName, candidateNames);
        }
        const message = `error: unknown command '${unknownName}'${suggestion}`;
        this.error(message, { code: "commander.unknownCommand" });
      }
      /**
       * Get or set the program version.
       *
       * This method auto-registers the "-V, --version" option which will print the version number.
       *
       * You can optionally supply the flags and description to override the defaults.
       *
       * @param {string} [str]
       * @param {string} [flags]
       * @param {string} [description]
       * @return {(this | string | undefined)} `this` command for chaining, or version string if no arguments
       */
      version(str2, flags, description) {
        if (str2 === void 0) return this._version;
        this._version = str2;
        flags = flags || "-V, --version";
        description = description || "output the version number";
        const versionOption = this.createOption(flags, description);
        this._versionOptionName = versionOption.attributeName();
        this._registerOption(versionOption);
        this.on("option:" + versionOption.name(), () => {
          this._outputConfiguration.writeOut(`${str2}
`);
          this._exit(0, "commander.version", str2);
        });
        return this;
      }
      /**
       * Set the description.
       *
       * @param {string} [str]
       * @param {object} [argsDescription]
       * @return {(string|Command)}
       */
      description(str2, argsDescription) {
        if (str2 === void 0 && argsDescription === void 0)
          return this._description;
        this._description = str2;
        if (argsDescription) {
          this._argsDescription = argsDescription;
        }
        return this;
      }
      /**
       * Set the summary. Used when listed as subcommand of parent.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      summary(str2) {
        if (str2 === void 0) return this._summary;
        this._summary = str2;
        return this;
      }
      /**
       * Set an alias for the command.
       *
       * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
       *
       * @param {string} [alias]
       * @return {(string|Command)}
       */
      alias(alias) {
        if (alias === void 0) return this._aliases[0];
        let command = this;
        if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
          command = this.commands[this.commands.length - 1];
        }
        if (alias === command._name)
          throw new Error("Command alias can't be the same as its name");
        const matchingCommand = this.parent?._findCommand(alias);
        if (matchingCommand) {
          const existingCmd = [matchingCommand.name()].concat(matchingCommand.aliases()).join("|");
          throw new Error(
            `cannot add alias '${alias}' to command '${this.name()}' as already have command '${existingCmd}'`
          );
        }
        command._aliases.push(alias);
        return this;
      }
      /**
       * Set aliases for the command.
       *
       * Only the first alias is shown in the auto-generated help.
       *
       * @param {string[]} [aliases]
       * @return {(string[]|Command)}
       */
      aliases(aliases) {
        if (aliases === void 0) return this._aliases;
        aliases.forEach((alias) => this.alias(alias));
        return this;
      }
      /**
       * Set / get the command usage `str`.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      usage(str2) {
        if (str2 === void 0) {
          if (this._usage) return this._usage;
          const args = this.registeredArguments.map((arg) => {
            return humanReadableArgName(arg);
          });
          return [].concat(
            this.options.length || this._helpOption !== null ? "[options]" : [],
            this.commands.length ? "[command]" : [],
            this.registeredArguments.length ? args : []
          ).join(" ");
        }
        this._usage = str2;
        return this;
      }
      /**
       * Get or set the name of the command.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      name(str2) {
        if (str2 === void 0) return this._name;
        this._name = str2;
        return this;
      }
      /**
       * Set the name of the command from script filename, such as process.argv[1],
       * or require.main.filename, or __filename.
       *
       * (Used internally and public although not documented in README.)
       *
       * @example
       * program.nameFromFilename(require.main.filename);
       *
       * @param {string} filename
       * @return {Command}
       */
      nameFromFilename(filename) {
        this._name = path2.basename(filename, path2.extname(filename));
        return this;
      }
      /**
       * Get or set the directory for searching for executable subcommands of this command.
       *
       * @example
       * program.executableDir(__dirname);
       * // or
       * program.executableDir('subcommands');
       *
       * @param {string} [path]
       * @return {(string|null|Command)}
       */
      executableDir(path3) {
        if (path3 === void 0) return this._executableDir;
        this._executableDir = path3;
        return this;
      }
      /**
       * Return program help documentation.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
       * @return {string}
       */
      helpInformation(contextOptions) {
        const helper = this.createHelp();
        if (helper.helpWidth === void 0) {
          helper.helpWidth = contextOptions && contextOptions.error ? this._outputConfiguration.getErrHelpWidth() : this._outputConfiguration.getOutHelpWidth();
        }
        return helper.formatHelp(this, helper);
      }
      /**
       * @private
       */
      _getHelpContext(contextOptions) {
        contextOptions = contextOptions || {};
        const context = { error: !!contextOptions.error };
        let write;
        if (context.error) {
          write = (arg) => this._outputConfiguration.writeErr(arg);
        } else {
          write = (arg) => this._outputConfiguration.writeOut(arg);
        }
        context.write = contextOptions.write || write;
        context.command = this;
        return context;
      }
      /**
       * Output help information for this command.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      outputHelp(contextOptions) {
        let deprecatedCallback;
        if (typeof contextOptions === "function") {
          deprecatedCallback = contextOptions;
          contextOptions = void 0;
        }
        const context = this._getHelpContext(contextOptions);
        this._getCommandAndAncestors().reverse().forEach((command) => command.emit("beforeAllHelp", context));
        this.emit("beforeHelp", context);
        let helpInformation = this.helpInformation(context);
        if (deprecatedCallback) {
          helpInformation = deprecatedCallback(helpInformation);
          if (typeof helpInformation !== "string" && !Buffer.isBuffer(helpInformation)) {
            throw new Error("outputHelp callback must return a string or a Buffer");
          }
        }
        context.write(helpInformation);
        if (this._getHelpOption()?.long) {
          this.emit(this._getHelpOption().long);
        }
        this.emit("afterHelp", context);
        this._getCommandAndAncestors().forEach(
          (command) => command.emit("afterAllHelp", context)
        );
      }
      /**
       * You can pass in flags and a description to customise the built-in help option.
       * Pass in false to disable the built-in help option.
       *
       * @example
       * program.helpOption('-?, --help' 'show help'); // customise
       * program.helpOption(false); // disable
       *
       * @param {(string | boolean)} flags
       * @param {string} [description]
       * @return {Command} `this` command for chaining
       */
      helpOption(flags, description) {
        if (typeof flags === "boolean") {
          if (flags) {
            this._helpOption = this._helpOption ?? void 0;
          } else {
            this._helpOption = null;
          }
          return this;
        }
        flags = flags ?? "-h, --help";
        description = description ?? "display help for command";
        this._helpOption = this.createOption(flags, description);
        return this;
      }
      /**
       * Lazy create help option.
       * Returns null if has been disabled with .helpOption(false).
       *
       * @returns {(Option | null)} the help option
       * @package
       */
      _getHelpOption() {
        if (this._helpOption === void 0) {
          this.helpOption(void 0, void 0);
        }
        return this._helpOption;
      }
      /**
       * Supply your own option to use for the built-in help option.
       * This is an alternative to using helpOption() to customise the flags and description etc.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addHelpOption(option) {
        this._helpOption = option;
        return this;
      }
      /**
       * Output help information and exit.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      help(contextOptions) {
        this.outputHelp(contextOptions);
        let exitCode = process17.exitCode || 0;
        if (exitCode === 0 && contextOptions && typeof contextOptions !== "function" && contextOptions.error) {
          exitCode = 1;
        }
        this._exit(exitCode, "commander.help", "(outputHelp)");
      }
      /**
       * Add additional text to be displayed with the built-in help.
       *
       * Position is 'before' or 'after' to affect just this command,
       * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
       *
       * @param {string} position - before or after built-in help
       * @param {(string | Function)} text - string to add, or a function returning a string
       * @return {Command} `this` command for chaining
       */
      addHelpText(position, text) {
        const allowedValues = ["beforeAll", "before", "after", "afterAll"];
        if (!allowedValues.includes(position)) {
          throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        const helpEvent = `${position}Help`;
        this.on(helpEvent, (context) => {
          let helpStr;
          if (typeof text === "function") {
            helpStr = text({ error: context.error, command: context.command });
          } else {
            helpStr = text;
          }
          if (helpStr) {
            context.write(`${helpStr}
`);
          }
        });
        return this;
      }
      /**
       * Output help information if help flags specified
       *
       * @param {Array} args - array of options to search for help flags
       * @private
       */
      _outputHelpIfRequested(args) {
        const helpOption = this._getHelpOption();
        const helpRequested = helpOption && args.find((arg) => helpOption.is(arg));
        if (helpRequested) {
          this.outputHelp();
          this._exit(0, "commander.helpDisplayed", "(outputHelp)");
        }
      }
    };
    function incrementNodeInspectorPort(args) {
      return args.map((arg) => {
        if (!arg.startsWith("--inspect")) {
          return arg;
        }
        let debugOption;
        let debugHost = "127.0.0.1";
        let debugPort = "9229";
        let match;
        if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
          debugOption = match[1];
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
          debugOption = match[1];
          if (/^\d+$/.test(match[3])) {
            debugPort = match[3];
          } else {
            debugHost = match[3];
          }
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
          debugOption = match[1];
          debugHost = match[3];
          debugPort = match[4];
        }
        if (debugOption && debugPort !== "0") {
          return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
        }
        return arg;
      });
    }
    exports.Command = Command2;
  }
});

// node_modules/.pnpm/commander@12.1.0/node_modules/commander/index.js
var require_commander = __commonJS({
  "node_modules/.pnpm/commander@12.1.0/node_modules/commander/index.js"(exports) {
    var { Argument: Argument2 } = require_argument();
    var { Command: Command2 } = require_command();
    var { CommanderError: CommanderError2, InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var { Help: Help2 } = require_help();
    var { Option: Option2 } = require_option();
    exports.program = new Command2();
    exports.createCommand = (name) => new Command2(name);
    exports.createOption = (flags, description) => new Option2(flags, description);
    exports.createArgument = (name, description) => new Argument2(name, description);
    exports.Command = Command2;
    exports.Option = Option2;
    exports.Argument = Argument2;
    exports.Help = Help2;
    exports.CommanderError = CommanderError2;
    exports.InvalidArgumentError = InvalidArgumentError2;
    exports.InvalidOptionArgumentError = InvalidArgumentError2;
  }
});

// node_modules/.pnpm/cli-spinners@2.9.2/node_modules/cli-spinners/spinners.json
var require_spinners = __commonJS({
  "node_modules/.pnpm/cli-spinners@2.9.2/node_modules/cli-spinners/spinners.json"(exports, module) {
    module.exports = {
      dots: {
        interval: 80,
        frames: [
          "\u280B",
          "\u2819",
          "\u2839",
          "\u2838",
          "\u283C",
          "\u2834",
          "\u2826",
          "\u2827",
          "\u2807",
          "\u280F"
        ]
      },
      dots2: {
        interval: 80,
        frames: [
          "\u28FE",
          "\u28FD",
          "\u28FB",
          "\u28BF",
          "\u287F",
          "\u28DF",
          "\u28EF",
          "\u28F7"
        ]
      },
      dots3: {
        interval: 80,
        frames: [
          "\u280B",
          "\u2819",
          "\u281A",
          "\u281E",
          "\u2816",
          "\u2826",
          "\u2834",
          "\u2832",
          "\u2833",
          "\u2813"
        ]
      },
      dots4: {
        interval: 80,
        frames: [
          "\u2804",
          "\u2806",
          "\u2807",
          "\u280B",
          "\u2819",
          "\u2838",
          "\u2830",
          "\u2820",
          "\u2830",
          "\u2838",
          "\u2819",
          "\u280B",
          "\u2807",
          "\u2806"
        ]
      },
      dots5: {
        interval: 80,
        frames: [
          "\u280B",
          "\u2819",
          "\u281A",
          "\u2812",
          "\u2802",
          "\u2802",
          "\u2812",
          "\u2832",
          "\u2834",
          "\u2826",
          "\u2816",
          "\u2812",
          "\u2810",
          "\u2810",
          "\u2812",
          "\u2813",
          "\u280B"
        ]
      },
      dots6: {
        interval: 80,
        frames: [
          "\u2801",
          "\u2809",
          "\u2819",
          "\u281A",
          "\u2812",
          "\u2802",
          "\u2802",
          "\u2812",
          "\u2832",
          "\u2834",
          "\u2824",
          "\u2804",
          "\u2804",
          "\u2824",
          "\u2834",
          "\u2832",
          "\u2812",
          "\u2802",
          "\u2802",
          "\u2812",
          "\u281A",
          "\u2819",
          "\u2809",
          "\u2801"
        ]
      },
      dots7: {
        interval: 80,
        frames: [
          "\u2808",
          "\u2809",
          "\u280B",
          "\u2813",
          "\u2812",
          "\u2810",
          "\u2810",
          "\u2812",
          "\u2816",
          "\u2826",
          "\u2824",
          "\u2820",
          "\u2820",
          "\u2824",
          "\u2826",
          "\u2816",
          "\u2812",
          "\u2810",
          "\u2810",
          "\u2812",
          "\u2813",
          "\u280B",
          "\u2809",
          "\u2808"
        ]
      },
      dots8: {
        interval: 80,
        frames: [
          "\u2801",
          "\u2801",
          "\u2809",
          "\u2819",
          "\u281A",
          "\u2812",
          "\u2802",
          "\u2802",
          "\u2812",
          "\u2832",
          "\u2834",
          "\u2824",
          "\u2804",
          "\u2804",
          "\u2824",
          "\u2820",
          "\u2820",
          "\u2824",
          "\u2826",
          "\u2816",
          "\u2812",
          "\u2810",
          "\u2810",
          "\u2812",
          "\u2813",
          "\u280B",
          "\u2809",
          "\u2808",
          "\u2808"
        ]
      },
      dots9: {
        interval: 80,
        frames: [
          "\u28B9",
          "\u28BA",
          "\u28BC",
          "\u28F8",
          "\u28C7",
          "\u2867",
          "\u2857",
          "\u284F"
        ]
      },
      dots10: {
        interval: 80,
        frames: [
          "\u2884",
          "\u2882",
          "\u2881",
          "\u2841",
          "\u2848",
          "\u2850",
          "\u2860"
        ]
      },
      dots11: {
        interval: 100,
        frames: [
          "\u2801",
          "\u2802",
          "\u2804",
          "\u2840",
          "\u2880",
          "\u2820",
          "\u2810",
          "\u2808"
        ]
      },
      dots12: {
        interval: 80,
        frames: [
          "\u2880\u2800",
          "\u2840\u2800",
          "\u2804\u2800",
          "\u2882\u2800",
          "\u2842\u2800",
          "\u2805\u2800",
          "\u2883\u2800",
          "\u2843\u2800",
          "\u280D\u2800",
          "\u288B\u2800",
          "\u284B\u2800",
          "\u280D\u2801",
          "\u288B\u2801",
          "\u284B\u2801",
          "\u280D\u2809",
          "\u280B\u2809",
          "\u280B\u2809",
          "\u2809\u2819",
          "\u2809\u2819",
          "\u2809\u2829",
          "\u2808\u2899",
          "\u2808\u2859",
          "\u2888\u2829",
          "\u2840\u2899",
          "\u2804\u2859",
          "\u2882\u2829",
          "\u2842\u2898",
          "\u2805\u2858",
          "\u2883\u2828",
          "\u2843\u2890",
          "\u280D\u2850",
          "\u288B\u2820",
          "\u284B\u2880",
          "\u280D\u2841",
          "\u288B\u2801",
          "\u284B\u2801",
          "\u280D\u2809",
          "\u280B\u2809",
          "\u280B\u2809",
          "\u2809\u2819",
          "\u2809\u2819",
          "\u2809\u2829",
          "\u2808\u2899",
          "\u2808\u2859",
          "\u2808\u2829",
          "\u2800\u2899",
          "\u2800\u2859",
          "\u2800\u2829",
          "\u2800\u2898",
          "\u2800\u2858",
          "\u2800\u2828",
          "\u2800\u2890",
          "\u2800\u2850",
          "\u2800\u2820",
          "\u2800\u2880",
          "\u2800\u2840"
        ]
      },
      dots13: {
        interval: 80,
        frames: [
          "\u28FC",
          "\u28F9",
          "\u28BB",
          "\u283F",
          "\u285F",
          "\u28CF",
          "\u28E7",
          "\u28F6"
        ]
      },
      dots8Bit: {
        interval: 80,
        frames: [
          "\u2800",
          "\u2801",
          "\u2802",
          "\u2803",
          "\u2804",
          "\u2805",
          "\u2806",
          "\u2807",
          "\u2840",
          "\u2841",
          "\u2842",
          "\u2843",
          "\u2844",
          "\u2845",
          "\u2846",
          "\u2847",
          "\u2808",
          "\u2809",
          "\u280A",
          "\u280B",
          "\u280C",
          "\u280D",
          "\u280E",
          "\u280F",
          "\u2848",
          "\u2849",
          "\u284A",
          "\u284B",
          "\u284C",
          "\u284D",
          "\u284E",
          "\u284F",
          "\u2810",
          "\u2811",
          "\u2812",
          "\u2813",
          "\u2814",
          "\u2815",
          "\u2816",
          "\u2817",
          "\u2850",
          "\u2851",
          "\u2852",
          "\u2853",
          "\u2854",
          "\u2855",
          "\u2856",
          "\u2857",
          "\u2818",
          "\u2819",
          "\u281A",
          "\u281B",
          "\u281C",
          "\u281D",
          "\u281E",
          "\u281F",
          "\u2858",
          "\u2859",
          "\u285A",
          "\u285B",
          "\u285C",
          "\u285D",
          "\u285E",
          "\u285F",
          "\u2820",
          "\u2821",
          "\u2822",
          "\u2823",
          "\u2824",
          "\u2825",
          "\u2826",
          "\u2827",
          "\u2860",
          "\u2861",
          "\u2862",
          "\u2863",
          "\u2864",
          "\u2865",
          "\u2866",
          "\u2867",
          "\u2828",
          "\u2829",
          "\u282A",
          "\u282B",
          "\u282C",
          "\u282D",
          "\u282E",
          "\u282F",
          "\u2868",
          "\u2869",
          "\u286A",
          "\u286B",
          "\u286C",
          "\u286D",
          "\u286E",
          "\u286F",
          "\u2830",
          "\u2831",
          "\u2832",
          "\u2833",
          "\u2834",
          "\u2835",
          "\u2836",
          "\u2837",
          "\u2870",
          "\u2871",
          "\u2872",
          "\u2873",
          "\u2874",
          "\u2875",
          "\u2876",
          "\u2877",
          "\u2838",
          "\u2839",
          "\u283A",
          "\u283B",
          "\u283C",
          "\u283D",
          "\u283E",
          "\u283F",
          "\u2878",
          "\u2879",
          "\u287A",
          "\u287B",
          "\u287C",
          "\u287D",
          "\u287E",
          "\u287F",
          "\u2880",
          "\u2881",
          "\u2882",
          "\u2883",
          "\u2884",
          "\u2885",
          "\u2886",
          "\u2887",
          "\u28C0",
          "\u28C1",
          "\u28C2",
          "\u28C3",
          "\u28C4",
          "\u28C5",
          "\u28C6",
          "\u28C7",
          "\u2888",
          "\u2889",
          "\u288A",
          "\u288B",
          "\u288C",
          "\u288D",
          "\u288E",
          "\u288F",
          "\u28C8",
          "\u28C9",
          "\u28CA",
          "\u28CB",
          "\u28CC",
          "\u28CD",
          "\u28CE",
          "\u28CF",
          "\u2890",
          "\u2891",
          "\u2892",
          "\u2893",
          "\u2894",
          "\u2895",
          "\u2896",
          "\u2897",
          "\u28D0",
          "\u28D1",
          "\u28D2",
          "\u28D3",
          "\u28D4",
          "\u28D5",
          "\u28D6",
          "\u28D7",
          "\u2898",
          "\u2899",
          "\u289A",
          "\u289B",
          "\u289C",
          "\u289D",
          "\u289E",
          "\u289F",
          "\u28D8",
          "\u28D9",
          "\u28DA",
          "\u28DB",
          "\u28DC",
          "\u28DD",
          "\u28DE",
          "\u28DF",
          "\u28A0",
          "\u28A1",
          "\u28A2",
          "\u28A3",
          "\u28A4",
          "\u28A5",
          "\u28A6",
          "\u28A7",
          "\u28E0",
          "\u28E1",
          "\u28E2",
          "\u28E3",
          "\u28E4",
          "\u28E5",
          "\u28E6",
          "\u28E7",
          "\u28A8",
          "\u28A9",
          "\u28AA",
          "\u28AB",
          "\u28AC",
          "\u28AD",
          "\u28AE",
          "\u28AF",
          "\u28E8",
          "\u28E9",
          "\u28EA",
          "\u28EB",
          "\u28EC",
          "\u28ED",
          "\u28EE",
          "\u28EF",
          "\u28B0",
          "\u28B1",
          "\u28B2",
          "\u28B3",
          "\u28B4",
          "\u28B5",
          "\u28B6",
          "\u28B7",
          "\u28F0",
          "\u28F1",
          "\u28F2",
          "\u28F3",
          "\u28F4",
          "\u28F5",
          "\u28F6",
          "\u28F7",
          "\u28B8",
          "\u28B9",
          "\u28BA",
          "\u28BB",
          "\u28BC",
          "\u28BD",
          "\u28BE",
          "\u28BF",
          "\u28F8",
          "\u28F9",
          "\u28FA",
          "\u28FB",
          "\u28FC",
          "\u28FD",
          "\u28FE",
          "\u28FF"
        ]
      },
      sand: {
        interval: 80,
        frames: [
          "\u2801",
          "\u2802",
          "\u2804",
          "\u2840",
          "\u2848",
          "\u2850",
          "\u2860",
          "\u28C0",
          "\u28C1",
          "\u28C2",
          "\u28C4",
          "\u28CC",
          "\u28D4",
          "\u28E4",
          "\u28E5",
          "\u28E6",
          "\u28EE",
          "\u28F6",
          "\u28F7",
          "\u28FF",
          "\u287F",
          "\u283F",
          "\u289F",
          "\u281F",
          "\u285B",
          "\u281B",
          "\u282B",
          "\u288B",
          "\u280B",
          "\u280D",
          "\u2849",
          "\u2809",
          "\u2811",
          "\u2821",
          "\u2881"
        ]
      },
      line: {
        interval: 130,
        frames: [
          "-",
          "\\",
          "|",
          "/"
        ]
      },
      line2: {
        interval: 100,
        frames: [
          "\u2802",
          "-",
          "\u2013",
          "\u2014",
          "\u2013",
          "-"
        ]
      },
      pipe: {
        interval: 100,
        frames: [
          "\u2524",
          "\u2518",
          "\u2534",
          "\u2514",
          "\u251C",
          "\u250C",
          "\u252C",
          "\u2510"
        ]
      },
      simpleDots: {
        interval: 400,
        frames: [
          ".  ",
          ".. ",
          "...",
          "   "
        ]
      },
      simpleDotsScrolling: {
        interval: 200,
        frames: [
          ".  ",
          ".. ",
          "...",
          " ..",
          "  .",
          "   "
        ]
      },
      star: {
        interval: 70,
        frames: [
          "\u2736",
          "\u2738",
          "\u2739",
          "\u273A",
          "\u2739",
          "\u2737"
        ]
      },
      star2: {
        interval: 80,
        frames: [
          "+",
          "x",
          "*"
        ]
      },
      flip: {
        interval: 70,
        frames: [
          "_",
          "_",
          "_",
          "-",
          "`",
          "`",
          "'",
          "\xB4",
          "-",
          "_",
          "_",
          "_"
        ]
      },
      hamburger: {
        interval: 100,
        frames: [
          "\u2631",
          "\u2632",
          "\u2634"
        ]
      },
      growVertical: {
        interval: 120,
        frames: [
          "\u2581",
          "\u2583",
          "\u2584",
          "\u2585",
          "\u2586",
          "\u2587",
          "\u2586",
          "\u2585",
          "\u2584",
          "\u2583"
        ]
      },
      growHorizontal: {
        interval: 120,
        frames: [
          "\u258F",
          "\u258E",
          "\u258D",
          "\u258C",
          "\u258B",
          "\u258A",
          "\u2589",
          "\u258A",
          "\u258B",
          "\u258C",
          "\u258D",
          "\u258E"
        ]
      },
      balloon: {
        interval: 140,
        frames: [
          " ",
          ".",
          "o",
          "O",
          "@",
          "*",
          " "
        ]
      },
      balloon2: {
        interval: 120,
        frames: [
          ".",
          "o",
          "O",
          "\xB0",
          "O",
          "o",
          "."
        ]
      },
      noise: {
        interval: 100,
        frames: [
          "\u2593",
          "\u2592",
          "\u2591"
        ]
      },
      bounce: {
        interval: 120,
        frames: [
          "\u2801",
          "\u2802",
          "\u2804",
          "\u2802"
        ]
      },
      boxBounce: {
        interval: 120,
        frames: [
          "\u2596",
          "\u2598",
          "\u259D",
          "\u2597"
        ]
      },
      boxBounce2: {
        interval: 100,
        frames: [
          "\u258C",
          "\u2580",
          "\u2590",
          "\u2584"
        ]
      },
      triangle: {
        interval: 50,
        frames: [
          "\u25E2",
          "\u25E3",
          "\u25E4",
          "\u25E5"
        ]
      },
      binary: {
        interval: 80,
        frames: [
          "010010",
          "001100",
          "100101",
          "111010",
          "111101",
          "010111",
          "101011",
          "111000",
          "110011",
          "110101"
        ]
      },
      arc: {
        interval: 100,
        frames: [
          "\u25DC",
          "\u25E0",
          "\u25DD",
          "\u25DE",
          "\u25E1",
          "\u25DF"
        ]
      },
      circle: {
        interval: 120,
        frames: [
          "\u25E1",
          "\u2299",
          "\u25E0"
        ]
      },
      squareCorners: {
        interval: 180,
        frames: [
          "\u25F0",
          "\u25F3",
          "\u25F2",
          "\u25F1"
        ]
      },
      circleQuarters: {
        interval: 120,
        frames: [
          "\u25F4",
          "\u25F7",
          "\u25F6",
          "\u25F5"
        ]
      },
      circleHalves: {
        interval: 50,
        frames: [
          "\u25D0",
          "\u25D3",
          "\u25D1",
          "\u25D2"
        ]
      },
      squish: {
        interval: 100,
        frames: [
          "\u256B",
          "\u256A"
        ]
      },
      toggle: {
        interval: 250,
        frames: [
          "\u22B6",
          "\u22B7"
        ]
      },
      toggle2: {
        interval: 80,
        frames: [
          "\u25AB",
          "\u25AA"
        ]
      },
      toggle3: {
        interval: 120,
        frames: [
          "\u25A1",
          "\u25A0"
        ]
      },
      toggle4: {
        interval: 100,
        frames: [
          "\u25A0",
          "\u25A1",
          "\u25AA",
          "\u25AB"
        ]
      },
      toggle5: {
        interval: 100,
        frames: [
          "\u25AE",
          "\u25AF"
        ]
      },
      toggle6: {
        interval: 300,
        frames: [
          "\u101D",
          "\u1040"
        ]
      },
      toggle7: {
        interval: 80,
        frames: [
          "\u29BE",
          "\u29BF"
        ]
      },
      toggle8: {
        interval: 100,
        frames: [
          "\u25CD",
          "\u25CC"
        ]
      },
      toggle9: {
        interval: 100,
        frames: [
          "\u25C9",
          "\u25CE"
        ]
      },
      toggle10: {
        interval: 100,
        frames: [
          "\u3282",
          "\u3280",
          "\u3281"
        ]
      },
      toggle11: {
        interval: 50,
        frames: [
          "\u29C7",
          "\u29C6"
        ]
      },
      toggle12: {
        interval: 120,
        frames: [
          "\u2617",
          "\u2616"
        ]
      },
      toggle13: {
        interval: 80,
        frames: [
          "=",
          "*",
          "-"
        ]
      },
      arrow: {
        interval: 100,
        frames: [
          "\u2190",
          "\u2196",
          "\u2191",
          "\u2197",
          "\u2192",
          "\u2198",
          "\u2193",
          "\u2199"
        ]
      },
      arrow2: {
        interval: 80,
        frames: [
          "\u2B06\uFE0F ",
          "\u2197\uFE0F ",
          "\u27A1\uFE0F ",
          "\u2198\uFE0F ",
          "\u2B07\uFE0F ",
          "\u2199\uFE0F ",
          "\u2B05\uFE0F ",
          "\u2196\uFE0F "
        ]
      },
      arrow3: {
        interval: 120,
        frames: [
          "\u25B9\u25B9\u25B9\u25B9\u25B9",
          "\u25B8\u25B9\u25B9\u25B9\u25B9",
          "\u25B9\u25B8\u25B9\u25B9\u25B9",
          "\u25B9\u25B9\u25B8\u25B9\u25B9",
          "\u25B9\u25B9\u25B9\u25B8\u25B9",
          "\u25B9\u25B9\u25B9\u25B9\u25B8"
        ]
      },
      bouncingBar: {
        interval: 80,
        frames: [
          "[    ]",
          "[=   ]",
          "[==  ]",
          "[=== ]",
          "[====]",
          "[ ===]",
          "[  ==]",
          "[   =]",
          "[    ]",
          "[   =]",
          "[  ==]",
          "[ ===]",
          "[====]",
          "[=== ]",
          "[==  ]",
          "[=   ]"
        ]
      },
      bouncingBall: {
        interval: 80,
        frames: [
          "( \u25CF    )",
          "(  \u25CF   )",
          "(   \u25CF  )",
          "(    \u25CF )",
          "(     \u25CF)",
          "(    \u25CF )",
          "(   \u25CF  )",
          "(  \u25CF   )",
          "( \u25CF    )",
          "(\u25CF     )"
        ]
      },
      smiley: {
        interval: 200,
        frames: [
          "\u{1F604} ",
          "\u{1F61D} "
        ]
      },
      monkey: {
        interval: 300,
        frames: [
          "\u{1F648} ",
          "\u{1F648} ",
          "\u{1F649} ",
          "\u{1F64A} "
        ]
      },
      hearts: {
        interval: 100,
        frames: [
          "\u{1F49B} ",
          "\u{1F499} ",
          "\u{1F49C} ",
          "\u{1F49A} ",
          "\u2764\uFE0F "
        ]
      },
      clock: {
        interval: 100,
        frames: [
          "\u{1F55B} ",
          "\u{1F550} ",
          "\u{1F551} ",
          "\u{1F552} ",
          "\u{1F553} ",
          "\u{1F554} ",
          "\u{1F555} ",
          "\u{1F556} ",
          "\u{1F557} ",
          "\u{1F558} ",
          "\u{1F559} ",
          "\u{1F55A} "
        ]
      },
      earth: {
        interval: 180,
        frames: [
          "\u{1F30D} ",
          "\u{1F30E} ",
          "\u{1F30F} "
        ]
      },
      material: {
        interval: 17,
        frames: [
          "\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
          "\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
          "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
          "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
          "\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
          "\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581"
        ]
      },
      moon: {
        interval: 80,
        frames: [
          "\u{1F311} ",
          "\u{1F312} ",
          "\u{1F313} ",
          "\u{1F314} ",
          "\u{1F315} ",
          "\u{1F316} ",
          "\u{1F317} ",
          "\u{1F318} "
        ]
      },
      runner: {
        interval: 140,
        frames: [
          "\u{1F6B6} ",
          "\u{1F3C3} "
        ]
      },
      pong: {
        interval: 80,
        frames: [
          "\u2590\u2802       \u258C",
          "\u2590\u2808       \u258C",
          "\u2590 \u2802      \u258C",
          "\u2590 \u2820      \u258C",
          "\u2590  \u2840     \u258C",
          "\u2590  \u2820     \u258C",
          "\u2590   \u2802    \u258C",
          "\u2590   \u2808    \u258C",
          "\u2590    \u2802   \u258C",
          "\u2590    \u2820   \u258C",
          "\u2590     \u2840  \u258C",
          "\u2590     \u2820  \u258C",
          "\u2590      \u2802 \u258C",
          "\u2590      \u2808 \u258C",
          "\u2590       \u2802\u258C",
          "\u2590       \u2820\u258C",
          "\u2590       \u2840\u258C",
          "\u2590      \u2820 \u258C",
          "\u2590      \u2802 \u258C",
          "\u2590     \u2808  \u258C",
          "\u2590     \u2802  \u258C",
          "\u2590    \u2820   \u258C",
          "\u2590    \u2840   \u258C",
          "\u2590   \u2820    \u258C",
          "\u2590   \u2802    \u258C",
          "\u2590  \u2808     \u258C",
          "\u2590  \u2802     \u258C",
          "\u2590 \u2820      \u258C",
          "\u2590 \u2840      \u258C",
          "\u2590\u2820       \u258C"
        ]
      },
      shark: {
        interval: 120,
        frames: [
          "\u2590|\\____________\u258C",
          "\u2590_|\\___________\u258C",
          "\u2590__|\\__________\u258C",
          "\u2590___|\\_________\u258C",
          "\u2590____|\\________\u258C",
          "\u2590_____|\\_______\u258C",
          "\u2590______|\\______\u258C",
          "\u2590_______|\\_____\u258C",
          "\u2590________|\\____\u258C",
          "\u2590_________|\\___\u258C",
          "\u2590__________|\\__\u258C",
          "\u2590___________|\\_\u258C",
          "\u2590____________|\\\u258C",
          "\u2590____________/|\u258C",
          "\u2590___________/|_\u258C",
          "\u2590__________/|__\u258C",
          "\u2590_________/|___\u258C",
          "\u2590________/|____\u258C",
          "\u2590_______/|_____\u258C",
          "\u2590______/|______\u258C",
          "\u2590_____/|_______\u258C",
          "\u2590____/|________\u258C",
          "\u2590___/|_________\u258C",
          "\u2590__/|__________\u258C",
          "\u2590_/|___________\u258C",
          "\u2590/|____________\u258C"
        ]
      },
      dqpb: {
        interval: 100,
        frames: [
          "d",
          "q",
          "p",
          "b"
        ]
      },
      weather: {
        interval: 100,
        frames: [
          "\u2600\uFE0F ",
          "\u2600\uFE0F ",
          "\u2600\uFE0F ",
          "\u{1F324} ",
          "\u26C5\uFE0F ",
          "\u{1F325} ",
          "\u2601\uFE0F ",
          "\u{1F327} ",
          "\u{1F328} ",
          "\u{1F327} ",
          "\u{1F328} ",
          "\u{1F327} ",
          "\u{1F328} ",
          "\u26C8 ",
          "\u{1F328} ",
          "\u{1F327} ",
          "\u{1F328} ",
          "\u2601\uFE0F ",
          "\u{1F325} ",
          "\u26C5\uFE0F ",
          "\u{1F324} ",
          "\u2600\uFE0F ",
          "\u2600\uFE0F "
        ]
      },
      christmas: {
        interval: 400,
        frames: [
          "\u{1F332}",
          "\u{1F384}"
        ]
      },
      grenade: {
        interval: 80,
        frames: [
          "\u060C  ",
          "\u2032  ",
          " \xB4 ",
          " \u203E ",
          "  \u2E0C",
          "  \u2E0A",
          "  |",
          "  \u204E",
          "  \u2055",
          " \u0DF4 ",
          "  \u2053",
          "   ",
          "   ",
          "   "
        ]
      },
      point: {
        interval: 125,
        frames: [
          "\u2219\u2219\u2219",
          "\u25CF\u2219\u2219",
          "\u2219\u25CF\u2219",
          "\u2219\u2219\u25CF",
          "\u2219\u2219\u2219"
        ]
      },
      layer: {
        interval: 150,
        frames: [
          "-",
          "=",
          "\u2261"
        ]
      },
      betaWave: {
        interval: 80,
        frames: [
          "\u03C1\u03B2\u03B2\u03B2\u03B2\u03B2\u03B2",
          "\u03B2\u03C1\u03B2\u03B2\u03B2\u03B2\u03B2",
          "\u03B2\u03B2\u03C1\u03B2\u03B2\u03B2\u03B2",
          "\u03B2\u03B2\u03B2\u03C1\u03B2\u03B2\u03B2",
          "\u03B2\u03B2\u03B2\u03B2\u03C1\u03B2\u03B2",
          "\u03B2\u03B2\u03B2\u03B2\u03B2\u03C1\u03B2",
          "\u03B2\u03B2\u03B2\u03B2\u03B2\u03B2\u03C1"
        ]
      },
      fingerDance: {
        interval: 160,
        frames: [
          "\u{1F918} ",
          "\u{1F91F} ",
          "\u{1F596} ",
          "\u270B ",
          "\u{1F91A} ",
          "\u{1F446} "
        ]
      },
      fistBump: {
        interval: 80,
        frames: [
          "\u{1F91C}\u3000\u3000\u3000\u3000\u{1F91B} ",
          "\u{1F91C}\u3000\u3000\u3000\u3000\u{1F91B} ",
          "\u{1F91C}\u3000\u3000\u3000\u3000\u{1F91B} ",
          "\u3000\u{1F91C}\u3000\u3000\u{1F91B}\u3000 ",
          "\u3000\u3000\u{1F91C}\u{1F91B}\u3000\u3000 ",
          "\u3000\u{1F91C}\u2728\u{1F91B}\u3000\u3000 ",
          "\u{1F91C}\u3000\u2728\u3000\u{1F91B}\u3000 "
        ]
      },
      soccerHeader: {
        interval: 80,
        frames: [
          " \u{1F9D1}\u26BD\uFE0F       \u{1F9D1} ",
          "\u{1F9D1}  \u26BD\uFE0F      \u{1F9D1} ",
          "\u{1F9D1}   \u26BD\uFE0F     \u{1F9D1} ",
          "\u{1F9D1}    \u26BD\uFE0F    \u{1F9D1} ",
          "\u{1F9D1}     \u26BD\uFE0F   \u{1F9D1} ",
          "\u{1F9D1}      \u26BD\uFE0F  \u{1F9D1} ",
          "\u{1F9D1}       \u26BD\uFE0F\u{1F9D1}  ",
          "\u{1F9D1}      \u26BD\uFE0F  \u{1F9D1} ",
          "\u{1F9D1}     \u26BD\uFE0F   \u{1F9D1} ",
          "\u{1F9D1}    \u26BD\uFE0F    \u{1F9D1} ",
          "\u{1F9D1}   \u26BD\uFE0F     \u{1F9D1} ",
          "\u{1F9D1}  \u26BD\uFE0F      \u{1F9D1} "
        ]
      },
      mindblown: {
        interval: 160,
        frames: [
          "\u{1F610} ",
          "\u{1F610} ",
          "\u{1F62E} ",
          "\u{1F62E} ",
          "\u{1F626} ",
          "\u{1F626} ",
          "\u{1F627} ",
          "\u{1F627} ",
          "\u{1F92F} ",
          "\u{1F4A5} ",
          "\u2728 ",
          "\u3000 ",
          "\u3000 ",
          "\u3000 "
        ]
      },
      speaker: {
        interval: 160,
        frames: [
          "\u{1F508} ",
          "\u{1F509} ",
          "\u{1F50A} ",
          "\u{1F509} "
        ]
      },
      orangePulse: {
        interval: 100,
        frames: [
          "\u{1F538} ",
          "\u{1F536} ",
          "\u{1F7E0} ",
          "\u{1F7E0} ",
          "\u{1F536} "
        ]
      },
      bluePulse: {
        interval: 100,
        frames: [
          "\u{1F539} ",
          "\u{1F537} ",
          "\u{1F535} ",
          "\u{1F535} ",
          "\u{1F537} "
        ]
      },
      orangeBluePulse: {
        interval: 100,
        frames: [
          "\u{1F538} ",
          "\u{1F536} ",
          "\u{1F7E0} ",
          "\u{1F7E0} ",
          "\u{1F536} ",
          "\u{1F539} ",
          "\u{1F537} ",
          "\u{1F535} ",
          "\u{1F535} ",
          "\u{1F537} "
        ]
      },
      timeTravel: {
        interval: 100,
        frames: [
          "\u{1F55B} ",
          "\u{1F55A} ",
          "\u{1F559} ",
          "\u{1F558} ",
          "\u{1F557} ",
          "\u{1F556} ",
          "\u{1F555} ",
          "\u{1F554} ",
          "\u{1F553} ",
          "\u{1F552} ",
          "\u{1F551} ",
          "\u{1F550} "
        ]
      },
      aesthetic: {
        interval: 80,
        frames: [
          "\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1\u25B1",
          "\u25B0\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1",
          "\u25B0\u25B0\u25B0\u25B1\u25B1\u25B1\u25B1",
          "\u25B0\u25B0\u25B0\u25B0\u25B1\u25B1\u25B1",
          "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B1\u25B1",
          "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0\u25B1",
          "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0",
          "\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1\u25B1"
        ]
      },
      dwarfFortress: {
        interval: 80,
        frames: [
          " \u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A\u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A\u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A\u2593\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A\u2593\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A\u2592\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A\u2592\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A\u2591\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A\u2591\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A \u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A\u2593\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A\u2593\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A\u2592\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A\u2592\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A\u2591\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A\u2591\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A \u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A\u2593\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A\u2593\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A\u2592\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A\u2592\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A\u2591\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A\u2591\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A \u2588\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A\u2593\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A\u2593\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A\u2592\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A\u2592\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A\u2591\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A\u2591\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A \u2588\u2588\xA3\xA3\xA3  ",
          "    \u263A\u2588\u2588\xA3\xA3\xA3  ",
          "    \u263A\u2588\u2588\xA3\xA3\xA3  ",
          "    \u263A\u2593\u2588\xA3\xA3\xA3  ",
          "    \u263A\u2593\u2588\xA3\xA3\xA3  ",
          "    \u263A\u2592\u2588\xA3\xA3\xA3  ",
          "    \u263A\u2592\u2588\xA3\xA3\xA3  ",
          "    \u263A\u2591\u2588\xA3\xA3\xA3  ",
          "    \u263A\u2591\u2588\xA3\xA3\xA3  ",
          "    \u263A \u2588\xA3\xA3\xA3  ",
          "     \u263A\u2588\xA3\xA3\xA3  ",
          "     \u263A\u2588\xA3\xA3\xA3  ",
          "     \u263A\u2593\xA3\xA3\xA3  ",
          "     \u263A\u2593\xA3\xA3\xA3  ",
          "     \u263A\u2592\xA3\xA3\xA3  ",
          "     \u263A\u2592\xA3\xA3\xA3  ",
          "     \u263A\u2591\xA3\xA3\xA3  ",
          "     \u263A\u2591\xA3\xA3\xA3  ",
          "     \u263A \xA3\xA3\xA3  ",
          "      \u263A\xA3\xA3\xA3  ",
          "      \u263A\xA3\xA3\xA3  ",
          "      \u263A\u2593\xA3\xA3  ",
          "      \u263A\u2593\xA3\xA3  ",
          "      \u263A\u2592\xA3\xA3  ",
          "      \u263A\u2592\xA3\xA3  ",
          "      \u263A\u2591\xA3\xA3  ",
          "      \u263A\u2591\xA3\xA3  ",
          "      \u263A \xA3\xA3  ",
          "       \u263A\xA3\xA3  ",
          "       \u263A\xA3\xA3  ",
          "       \u263A\u2593\xA3  ",
          "       \u263A\u2593\xA3  ",
          "       \u263A\u2592\xA3  ",
          "       \u263A\u2592\xA3  ",
          "       \u263A\u2591\xA3  ",
          "       \u263A\u2591\xA3  ",
          "       \u263A \xA3  ",
          "        \u263A\xA3  ",
          "        \u263A\xA3  ",
          "        \u263A\u2593  ",
          "        \u263A\u2593  ",
          "        \u263A\u2592  ",
          "        \u263A\u2592  ",
          "        \u263A\u2591  ",
          "        \u263A\u2591  ",
          "        \u263A   ",
          "        \u263A  &",
          "        \u263A \u263C&",
          "       \u263A \u263C &",
          "       \u263A\u263C  &",
          "      \u263A\u263C  & ",
          "      \u203C   & ",
          "     \u263A   &  ",
          "    \u203C    &  ",
          "   \u263A    &   ",
          "  \u203C     &   ",
          " \u263A     &    ",
          "\u203C      &    ",
          "      &     ",
          "      &     ",
          "     &   \u2591  ",
          "     &   \u2592  ",
          "    &    \u2593  ",
          "    &    \xA3  ",
          "   &    \u2591\xA3  ",
          "   &    \u2592\xA3  ",
          "  &     \u2593\xA3  ",
          "  &     \xA3\xA3  ",
          " &     \u2591\xA3\xA3  ",
          " &     \u2592\xA3\xA3  ",
          "&      \u2593\xA3\xA3  ",
          "&      \xA3\xA3\xA3  ",
          "      \u2591\xA3\xA3\xA3  ",
          "      \u2592\xA3\xA3\xA3  ",
          "      \u2593\xA3\xA3\xA3  ",
          "      \u2588\xA3\xA3\xA3  ",
          "     \u2591\u2588\xA3\xA3\xA3  ",
          "     \u2592\u2588\xA3\xA3\xA3  ",
          "     \u2593\u2588\xA3\xA3\xA3  ",
          "     \u2588\u2588\xA3\xA3\xA3  ",
          "    \u2591\u2588\u2588\xA3\xA3\xA3  ",
          "    \u2592\u2588\u2588\xA3\xA3\xA3  ",
          "    \u2593\u2588\u2588\xA3\xA3\xA3  ",
          "    \u2588\u2588\u2588\xA3\xA3\xA3  ",
          "   \u2591\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "   \u2592\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "   \u2593\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "   \u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u2591\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u2592\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u2593\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u2591\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u2592\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u2593\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  "
        ]
      }
    };
  }
});

// node_modules/.pnpm/cli-spinners@2.9.2/node_modules/cli-spinners/index.js
var require_cli_spinners = __commonJS({
  "node_modules/.pnpm/cli-spinners@2.9.2/node_modules/cli-spinners/index.js"(exports, module) {
    "use strict";
    var spinners = Object.assign({}, require_spinners());
    var spinnersList = Object.keys(spinners);
    Object.defineProperty(spinners, "random", {
      get() {
        const randomIndex = Math.floor(Math.random() * spinnersList.length);
        const spinnerName = spinnersList[randomIndex];
        return spinners[spinnerName];
      }
    });
    module.exports = spinners;
  }
});

// node_modules/.pnpm/emoji-regex@10.6.0/node_modules/emoji-regex/index.js
var require_emoji_regex = __commonJS({
  "node_modules/.pnpm/emoji-regex@10.6.0/node_modules/emoji-regex/index.js"(exports, module) {
    module.exports = () => {
      return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED8\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])))?))?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC2\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF]|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
    };
  }
});

// node_modules/.pnpm/commander@12.1.0/node_modules/commander/esm.mjs
var import_index = __toESM(require_commander(), 1);
var {
  program,
  createCommand,
  createArgument,
  createOption,
  CommanderError,
  InvalidArgumentError,
  InvalidOptionArgumentError,
  // deprecated old name
  Command,
  Argument,
  Option,
  Help
} = import_index.default;

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/vendor/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
var styles = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/vendor/supports-color/index.js
import process2 from "node:process";
import os from "node:os";
import tty from "node:tty";
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : process2.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
var { env } = process2;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (process2.platform === "win32") {
    const osRelease = os.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if (["GITHUB_ACTIONS", "GITEA_ACTIONS", "CIRCLECI"].some((key) => key in env)) {
      return 3;
    }
    if (["TRAVIS", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if (env.TERM === "xterm-ghostty") {
    return 3;
  }
  if (env.TERM === "wezterm") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: tty.isatty(1) }),
  stderr: createSupportsColor({ isTTY: tty.isatty(2) })
};
var supports_color_default = supportsColor;

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
var GENERATOR = Symbol("GENERATOR");
var STYLER = Symbol("STYLER");
var IS_EMPTY = Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles2 = /* @__PURE__ */ Object.create(null);
var applyOptions = (object, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === void 0 ? colorLevel : options.level;
};
var chalkFactory = (options) => {
  const chalk2 = (...strings) => strings.join(" ");
  applyOptions(chalk2, options);
  Object.setPrototypeOf(chalk2, createChalk.prototype);
  return chalk2;
};
function createChalk(options) {
  return chalkFactory(options);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansi_styles_default)) {
  styles2[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles2.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model, level, type, ...arguments_) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model of usedModels) {
  styles2[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles2[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {
}, {
  ...styles2,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open2, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open2;
    closeAll = close;
  } else {
    openAll = parent.openAll + open2;
    closeAll = close + parent.closeAll;
  }
  return {
    open: open2,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self, string) => {
  if (self.level <= 0 || !string) {
    return self[IS_EMPTY] ? "" : string;
  }
  let styler = self[STYLER];
  if (styler === void 0) {
    return string;
  }
  const { openAll, closeAll } = styler;
  if (string.includes("\x1B")) {
    while (styler !== void 0) {
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string.indexOf("\n");
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }
  return openAll + string + closeAll;
};
Object.defineProperties(createChalk.prototype, styles2);
var chalk = createChalk();
var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;

// packages/cli/src/b55.ts
var DEFAULT_SANDBOX_URL = "http://localhost:3100/api";
var DEFAULT_LIVE_URL = "https://b55-console.vercel.app/api";
var CANDIDATE_ID_RE = /^cand_[A-Za-z0-9]{1,64}$/;
var CANDIDATE_TOKEN_RE = /^b55ct_[A-Za-z0-9_-]{20,600}\.[A-Za-z0-9_-]{43}$/;
function parseCandidate(value) {
  const v = value.trim();
  if (CANDIDATE_ID_RE.test(v)) return { kind: "sandbox", id: v };
  if (!CANDIDATE_TOKEN_RE.test(v)) return null;
  try {
    const c = JSON.parse(Buffer.from(v.slice(6).split(".")[0], "base64url").toString("utf8"));
    if (typeof c.cid !== "string" || !/^cand_[a-z0-9]{6,40}$/.test(c.cid) || typeof c.jti !== "string" || !/^[A-Za-z0-9_-]{22}$/.test(c.jti) || !Number.isInteger(c.exp)) return null;
    return { kind: "live", id: c.cid, jti: c.jti, exp: c.exp, token: v };
  } catch {
    return null;
  }
}
var isLocalHost = (u) => ["localhost", "127.0.0.1", "[::1]"].includes(u.hostname) || u.hostname.endsWith(".localhost");
function apiBase(flag, kind = "sandbox", env2 = process.env) {
  const fallback2 = kind === "live" ? env2.B55_URL ?? DEFAULT_LIVE_URL : env2.B55_SANDBOX_URL ?? DEFAULT_SANDBOX_URL;
  const raw = (flag ?? fallback2).trim().replace(/\/+$/, "");
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new CandidateScanError(0, "bad_sandbox_url", `"${raw}" is not a URL. Pass something like ${kind === "live" ? DEFAULT_LIVE_URL : DEFAULT_SANDBOX_URL}.`);
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new CandidateScanError(0, "bad_sandbox_url", `"${raw}" must start with https://.`);
  if (url.protocol === "http:" && !isLocalHost(url)) throw new CandidateScanError(0, "bad_sandbox_url", `"${raw}" must use https:// (only localhost may use http://).`);
  return raw;
}
function stampForUpload(p, now = /* @__PURE__ */ new Date()) {
  return { ...p, generatedAt: now.toISOString() };
}
var CandidateScanError = class extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = "CandidateScanError";
  }
};
async function sendCandidateScan(base, ref, payload, fetchImpl = fetch) {
  const headers = { "content-type": "application/json" };
  if (ref.kind === "live") headers.authorization = `Bearer ${ref.token}`;
  let res;
  try {
    res = await fetchImpl(`${base}/v0/candidates/${encodeURIComponent(ref.id)}/scan`, { method: "POST", headers, body: JSON.stringify(payload), signal: AbortSignal.timeout(9e4) });
  } catch (e) {
    throw new CandidateScanError(0, "connection_error", `Couldn't reach B55 at ${base} (${e.message}).`);
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new CandidateScanError(res.status, typeof data?.code === "string" ? data.code : "http_error", typeof data?.message === "string" ? data.message : `HTTP ${res.status}`);
  }
  if (!data || typeof data.id !== "string" || typeof data.status !== "string") throw new CandidateScanError(res.status, "http_error", "B55 answered, but not with an application.");
  return { id: data.id, job_id: String(data.job_id ?? ""), status: data.status, report_id: typeof data.report_id === "string" ? data.report_id : null, verdict: typeof data.verdict === "string" ? data.verdict : null };
}
function consoleOrigin(base) {
  return base.replace(/\/api$/, "");
}
var FROM_PAGE = "Get a new command from the apply page and run it again.";
function explainCandidateError(e, ref, base) {
  switch (e.code) {
    case "connection_error":
      return ref.kind === "sandbox" ? `${e.message} Is the console running? Start it with  pnpm dev:console  (or pass --sandbox-url).` : `${e.message} Check your internet and try again.`;
    case "candidate_not_found":
      return `There is no application ${ref.id} at ${base}. Copy the command again from the apply page.`;
    case "consent_required":
      return "You haven't consented yet. Open the job's apply link, sign in, read what is shared, and consent. Then run this again.";
    case "candidate_finished":
      return "This application already has a report. Nothing more was sent.";
    case "scan_replayed":
      return "This exact scan was already sent. Run the command again to make a fresh one.";
    case "token_used":
      return `This command was already used. ${FROM_PAGE}`;
    case "token_expired":
      return `This command expired (they last 2 hours). ${FROM_PAGE}`;
    case "token_revoked":
      return `A newer command replaced this one. ${FROM_PAGE}`;
    case "token_identity_mismatch":
      return `This command belongs to a different GitHub sign-in. ${FROM_PAGE}`;
    case "token_unknown":
    case "token_malformed":
    case "token_bad_signature":
    case "token_wrong_candidate":
      return `B55 didn't recognise this command. Copy it again from the apply page, exactly as shown.`;
    case "nonce_mismatch":
      return `This scan was made for a different command. ${FROM_PAGE}`;
    case "demo_scan":
    case "sandbox_demo_only":
      return e.message;
    case "rate_limited":
      return "Too many uploads in a short time. Wait a minute and try again.";
    case "payload_too_large":
      return "The scan was too large to send. Run it inside one project folder instead of with --all.";
    case "invalid_scan":
    case "scan_integrity_failed":
      return `B55 could not accept this scan (${e.code}): ${e.message}`;
    default:
      return `B55 said no (${e.code}): ${e.message}`;
  }
}

// packages/cli/src/scan.ts
import { createInterface as createInterface3 } from "node:readline/promises";

// node_modules/.pnpm/ora@8.2.0/node_modules/ora/index.js
import process9 from "node:process";

// node_modules/.pnpm/cli-cursor@5.0.0/node_modules/cli-cursor/index.js
import process5 from "node:process";

// node_modules/.pnpm/restore-cursor@5.1.0/node_modules/restore-cursor/index.js
import process4 from "node:process";

// node_modules/.pnpm/mimic-function@5.0.1/node_modules/mimic-function/index.js
var copyProperty = (to, from, property, ignoreNonConfigurable) => {
  if (property === "length" || property === "prototype") {
    return;
  }
  if (property === "arguments" || property === "caller") {
    return;
  }
  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }
  Object.defineProperty(to, property, fromDescriptor);
};
var canCopyProperty = function(toDescriptor, fromDescriptor) {
  return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
var changePrototype = (to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }
  Object.setPrototypeOf(to, fromPrototype);
};
var wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
var toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
var toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
var changeToString = (to, from, name) => {
  const withName = name === "" ? "" : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  const { writable, enumerable, configurable } = toStringDescriptor;
  Object.defineProperty(to, "toString", { value: newToString, writable, enumerable, configurable });
};
function mimicFunction(to, from, { ignoreNonConfigurable = false } = {}) {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
}

// node_modules/.pnpm/onetime@7.0.0/node_modules/onetime/index.js
var calledFunctions = /* @__PURE__ */ new WeakMap();
var onetime = (function_, options = {}) => {
  if (typeof function_ !== "function") {
    throw new TypeError("Expected a function");
  }
  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || "<anonymous>";
  const onetime2 = function(...arguments_) {
    calledFunctions.set(onetime2, ++callCount);
    if (callCount === 1) {
      returnValue = function_.apply(this, arguments_);
      function_ = void 0;
    } else if (options.throw === true) {
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }
    return returnValue;
  };
  mimicFunction(onetime2, function_);
  calledFunctions.set(onetime2, callCount);
  return onetime2;
};
onetime.callCount = (function_) => {
  if (!calledFunctions.has(function_)) {
    throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
  }
  return calledFunctions.get(function_);
};
var onetime_default = onetime;

// node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/mjs/signals.js
var signals = [];
signals.push("SIGHUP", "SIGINT", "SIGTERM");
if (process.platform !== "win32") {
  signals.push(
    "SIGALRM",
    "SIGABRT",
    "SIGVTALRM",
    "SIGXCPU",
    "SIGXFSZ",
    "SIGUSR2",
    "SIGTRAP",
    "SIGSYS",
    "SIGQUIT",
    "SIGIOT"
    // should detect profiler and enable/disable accordingly.
    // see #21
    // 'SIGPROF'
  );
}
if (process.platform === "linux") {
  signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
}

// node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/mjs/index.js
var processOk = (process17) => !!process17 && typeof process17 === "object" && typeof process17.removeListener === "function" && typeof process17.emit === "function" && typeof process17.reallyExit === "function" && typeof process17.listeners === "function" && typeof process17.kill === "function" && typeof process17.pid === "number" && typeof process17.on === "function";
var kExitEmitter = Symbol.for("signal-exit emitter");
var global = globalThis;
var ObjectDefineProperty = Object.defineProperty.bind(Object);
var Emitter = class {
  emitted = {
    afterExit: false,
    exit: false
  };
  listeners = {
    afterExit: [],
    exit: []
  };
  count = 0;
  id = Math.random();
  constructor() {
    if (global[kExitEmitter]) {
      return global[kExitEmitter];
    }
    ObjectDefineProperty(global, kExitEmitter, {
      value: this,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
  on(ev, fn) {
    this.listeners[ev].push(fn);
  }
  removeListener(ev, fn) {
    const list = this.listeners[ev];
    const i = list.indexOf(fn);
    if (i === -1) {
      return;
    }
    if (i === 0 && list.length === 1) {
      list.length = 0;
    } else {
      list.splice(i, 1);
    }
  }
  emit(ev, code, signal) {
    if (this.emitted[ev]) {
      return false;
    }
    this.emitted[ev] = true;
    let ret = false;
    for (const fn of this.listeners[ev]) {
      ret = fn(code, signal) === true || ret;
    }
    if (ev === "exit") {
      ret = this.emit("afterExit", code, signal) || ret;
    }
    return ret;
  }
};
var SignalExitBase = class {
};
var signalExitWrap = (handler) => {
  return {
    onExit(cb, opts) {
      return handler.onExit(cb, opts);
    },
    load() {
      return handler.load();
    },
    unload() {
      return handler.unload();
    }
  };
};
var SignalExitFallback = class extends SignalExitBase {
  onExit() {
    return () => {
    };
  }
  load() {
  }
  unload() {
  }
};
var SignalExit = class extends SignalExitBase {
  // "SIGHUP" throws an `ENOSYS` error on Windows,
  // so use a supported signal instead
  /* c8 ignore start */
  #hupSig = process3.platform === "win32" ? "SIGINT" : "SIGHUP";
  /* c8 ignore stop */
  #emitter = new Emitter();
  #process;
  #originalProcessEmit;
  #originalProcessReallyExit;
  #sigListeners = {};
  #loaded = false;
  constructor(process17) {
    super();
    this.#process = process17;
    this.#sigListeners = {};
    for (const sig of signals) {
      this.#sigListeners[sig] = () => {
        const listeners = this.#process.listeners(sig);
        let { count } = this.#emitter;
        const p = process17;
        if (typeof p.__signal_exit_emitter__ === "object" && typeof p.__signal_exit_emitter__.count === "number") {
          count += p.__signal_exit_emitter__.count;
        }
        if (listeners.length === count) {
          this.unload();
          const ret = this.#emitter.emit("exit", null, sig);
          const s = sig === "SIGHUP" ? this.#hupSig : sig;
          if (!ret)
            process17.kill(process17.pid, s);
        }
      };
    }
    this.#originalProcessReallyExit = process17.reallyExit;
    this.#originalProcessEmit = process17.emit;
  }
  onExit(cb, opts) {
    if (!processOk(this.#process)) {
      return () => {
      };
    }
    if (this.#loaded === false) {
      this.load();
    }
    const ev = opts?.alwaysLast ? "afterExit" : "exit";
    this.#emitter.on(ev, cb);
    return () => {
      this.#emitter.removeListener(ev, cb);
      if (this.#emitter.listeners["exit"].length === 0 && this.#emitter.listeners["afterExit"].length === 0) {
        this.unload();
      }
    };
  }
  load() {
    if (this.#loaded) {
      return;
    }
    this.#loaded = true;
    this.#emitter.count += 1;
    for (const sig of signals) {
      try {
        const fn = this.#sigListeners[sig];
        if (fn)
          this.#process.on(sig, fn);
      } catch (_) {
      }
    }
    this.#process.emit = (ev, ...a) => {
      return this.#processEmit(ev, ...a);
    };
    this.#process.reallyExit = (code) => {
      return this.#processReallyExit(code);
    };
  }
  unload() {
    if (!this.#loaded) {
      return;
    }
    this.#loaded = false;
    signals.forEach((sig) => {
      const listener = this.#sigListeners[sig];
      if (!listener) {
        throw new Error("Listener not defined for signal: " + sig);
      }
      try {
        this.#process.removeListener(sig, listener);
      } catch (_) {
      }
    });
    this.#process.emit = this.#originalProcessEmit;
    this.#process.reallyExit = this.#originalProcessReallyExit;
    this.#emitter.count -= 1;
  }
  #processReallyExit(code) {
    if (!processOk(this.#process)) {
      return 0;
    }
    this.#process.exitCode = code || 0;
    this.#emitter.emit("exit", this.#process.exitCode, null);
    return this.#originalProcessReallyExit.call(this.#process, this.#process.exitCode);
  }
  #processEmit(ev, ...args) {
    const og = this.#originalProcessEmit;
    if (ev === "exit" && processOk(this.#process)) {
      if (typeof args[0] === "number") {
        this.#process.exitCode = args[0];
      }
      const ret = og.call(this.#process, ev, ...args);
      this.#emitter.emit("exit", this.#process.exitCode, null);
      return ret;
    } else {
      return og.call(this.#process, ev, ...args);
    }
  }
};
var process3 = globalThis.process;
var {
  /**
   * Called when the process is exiting, whether via signal, explicit
   * exit, or running out of stuff to do.
   *
   * If the global process object is not suitable for instrumentation,
   * then this will be a no-op.
   *
   * Returns a function that may be used to unload signal-exit.
   */
  onExit,
  /**
   * Load the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  load,
  /**
   * Unload the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  unload
} = signalExitWrap(processOk(process3) ? new SignalExit(process3) : new SignalExitFallback());

// node_modules/.pnpm/restore-cursor@5.1.0/node_modules/restore-cursor/index.js
var terminal = process4.stderr.isTTY ? process4.stderr : process4.stdout.isTTY ? process4.stdout : void 0;
var restoreCursor = terminal ? onetime_default(() => {
  onExit(() => {
    terminal.write("\x1B[?25h");
  }, { alwaysLast: true });
}) : () => {
};
var restore_cursor_default = restoreCursor;

// node_modules/.pnpm/cli-cursor@5.0.0/node_modules/cli-cursor/index.js
var isHidden = false;
var cliCursor = {};
cliCursor.show = (writableStream = process5.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  isHidden = false;
  writableStream.write("\x1B[?25h");
};
cliCursor.hide = (writableStream = process5.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  restore_cursor_default();
  isHidden = true;
  writableStream.write("\x1B[?25l");
};
cliCursor.toggle = (force, writableStream) => {
  if (force !== void 0) {
    isHidden = force;
  }
  if (isHidden) {
    cliCursor.show(writableStream);
  } else {
    cliCursor.hide(writableStream);
  }
};
var cli_cursor_default = cliCursor;

// node_modules/.pnpm/ora@8.2.0/node_modules/ora/index.js
var import_cli_spinners = __toESM(require_cli_spinners(), 1);

// node_modules/.pnpm/is-unicode-supported@1.3.0/node_modules/is-unicode-supported/index.js
import process6 from "node:process";
function isUnicodeSupported() {
  if (process6.platform !== "win32") {
    return process6.env.TERM !== "linux";
  }
  return Boolean(process6.env.CI) || Boolean(process6.env.WT_SESSION) || Boolean(process6.env.TERMINUS_SUBLIME) || process6.env.ConEmuTask === "{cmd::Cmder}" || process6.env.TERM_PROGRAM === "Terminus-Sublime" || process6.env.TERM_PROGRAM === "vscode" || process6.env.TERM === "xterm-256color" || process6.env.TERM === "alacritty" || process6.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}

// node_modules/.pnpm/log-symbols@6.0.0/node_modules/log-symbols/index.js
var main = {
  info: source_default.blue("\u2139"),
  success: source_default.green("\u2714"),
  warning: source_default.yellow("\u26A0"),
  error: source_default.red("\u2716")
};
var fallback = {
  info: source_default.blue("i"),
  success: source_default.green("\u221A"),
  warning: source_default.yellow("\u203C"),
  error: source_default.red("\xD7")
};
var logSymbols = isUnicodeSupported() ? main : fallback;
var log_symbols_default = logSymbols;

// node_modules/.pnpm/ansi-regex@6.6.0/node_modules/ansi-regex/index.js
var ST = String.raw`(?:\u001B\u005C|\u009C)`;
var stringControls = String.raw`\u0018\u001A\u001B\u0080-\u009F`;
var osc = String.raw`(?:\u001B\]|\u009D)[^\u0007${stringControls}]*(?:\u0007|${ST})`;
var controlString = String.raw`(?:\u001B[PX^_k]|[\u0090\u0098\u009E\u009F])[^${stringControls}]*${ST}`;
var linuxPalette = String.raw`\u001B\](?:P[\dA-Fa-f]{7}|R)(?:\u0007|${ST})?`;
var csi = String.raw`(?:\u001B\[|\u009B)[\u0030-\u003F]*[\u0020-\u002F]*[\u0040-\u007E]`;
var escape = String.raw`\u001B(?:[\u0020-\u002F]+[\u0030-\u007E]|[\dA-PR-TZcf-oq-uy=><~|}])`;
var pattern = `${linuxPalette}|${osc}|${controlString}|${csi}|${escape}`;
function ansiRegex({ onlyFirst = false } = {}) {
  return new RegExp(pattern, onlyFirst ? void 0 : "g");
}

// node_modules/.pnpm/strip-ansi@7.2.0/node_modules/strip-ansi/index.js
var regex = ansiRegex();
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }
  if (!string.includes("\x1B") && !string.includes("\x9B")) {
    return string;
  }
  return string.replace(regex, "");
}

// node_modules/.pnpm/get-east-asian-width@1.7.0/node_modules/get-east-asian-width/lookup-data.js
var ambiguousMinimalCodePoint = 161;
var ambiguousMaximumCodePoint = 1114109;
var ambiguousRanges = [161, 161, 164, 164, 167, 168, 170, 170, 173, 174, 176, 180, 182, 186, 188, 191, 198, 198, 208, 208, 215, 216, 222, 225, 230, 230, 232, 234, 236, 237, 240, 240, 242, 243, 247, 250, 252, 252, 254, 254, 257, 257, 273, 273, 275, 275, 283, 283, 294, 295, 299, 299, 305, 307, 312, 312, 319, 322, 324, 324, 328, 331, 333, 333, 338, 339, 358, 359, 363, 363, 462, 462, 464, 464, 466, 466, 468, 468, 470, 470, 472, 472, 474, 474, 476, 476, 593, 593, 609, 609, 708, 708, 711, 711, 713, 715, 717, 717, 720, 720, 728, 731, 733, 733, 735, 735, 768, 879, 913, 929, 931, 937, 945, 961, 963, 969, 1025, 1025, 1040, 1103, 1105, 1105, 8208, 8208, 8211, 8214, 8216, 8217, 8220, 8221, 8224, 8226, 8228, 8231, 8240, 8240, 8242, 8243, 8245, 8245, 8251, 8251, 8254, 8254, 8308, 8308, 8319, 8319, 8321, 8324, 8364, 8364, 8451, 8451, 8453, 8453, 8457, 8457, 8467, 8467, 8470, 8470, 8481, 8482, 8486, 8486, 8491, 8491, 8531, 8532, 8539, 8542, 8544, 8555, 8560, 8569, 8585, 8585, 8592, 8601, 8632, 8633, 8658, 8658, 8660, 8660, 8679, 8679, 8704, 8704, 8706, 8707, 8711, 8712, 8715, 8715, 8719, 8719, 8721, 8721, 8725, 8725, 8730, 8730, 8733, 8736, 8739, 8739, 8741, 8741, 8743, 8748, 8750, 8750, 8756, 8759, 8764, 8765, 8776, 8776, 8780, 8780, 8786, 8786, 8800, 8801, 8804, 8807, 8810, 8811, 8814, 8815, 8834, 8835, 8838, 8839, 8853, 8853, 8857, 8857, 8869, 8869, 8895, 8895, 8978, 8978, 9312, 9449, 9451, 9547, 9552, 9587, 9600, 9615, 9618, 9621, 9632, 9633, 9635, 9641, 9650, 9651, 9654, 9655, 9660, 9661, 9664, 9665, 9670, 9672, 9675, 9675, 9678, 9681, 9698, 9701, 9711, 9711, 9733, 9734, 9737, 9737, 9742, 9743, 9756, 9756, 9758, 9758, 9792, 9792, 9794, 9794, 9824, 9825, 9827, 9829, 9831, 9834, 9836, 9837, 9839, 9839, 9886, 9887, 9919, 9919, 9926, 9933, 9935, 9939, 9941, 9953, 9955, 9955, 9960, 9961, 9963, 9969, 9972, 9972, 9974, 9977, 9979, 9980, 9982, 9983, 10045, 10045, 10102, 10111, 11094, 11097, 12872, 12879, 57344, 63743, 65024, 65039, 65533, 65533, 127232, 127242, 127248, 127277, 127280, 127337, 127344, 127373, 127375, 127376, 127387, 127404, 917760, 917999, 983040, 1048573, 1048576, 1114109];
var fullwidthMinimalCodePoint = 12288;
var fullwidthMaximumCodePoint = 65510;
var fullwidthRanges = [12288, 12288, 65281, 65376, 65504, 65510];
var wideMinimalCodePoint = 4352;
var wideMaximumCodePoint = 262141;
var wideRanges = [4352, 4447, 8986, 8987, 9001, 9002, 9193, 9196, 9200, 9200, 9203, 9203, 9725, 9726, 9748, 9749, 9776, 9783, 9800, 9811, 9855, 9855, 9866, 9871, 9875, 9875, 9889, 9889, 9898, 9899, 9917, 9918, 9924, 9925, 9934, 9934, 9940, 9940, 9962, 9962, 9970, 9971, 9973, 9973, 9978, 9978, 9981, 9981, 9989, 9989, 9994, 9995, 10024, 10024, 10060, 10060, 10062, 10062, 10067, 10069, 10071, 10071, 10133, 10135, 10160, 10160, 10175, 10175, 11035, 11036, 11088, 11088, 11093, 11093, 11904, 11929, 11931, 12019, 12032, 12245, 12272, 12287, 12289, 12350, 12353, 12438, 12441, 12543, 12549, 12591, 12593, 12686, 12688, 12773, 12783, 12830, 12832, 12871, 12880, 42124, 42128, 42182, 43360, 43388, 44032, 55203, 63744, 64255, 65040, 65049, 65072, 65106, 65108, 65126, 65128, 65131, 94176, 94180, 94192, 94198, 94208, 101594, 101631, 101664, 101760, 101874, 101888, 102801, 102816, 102866, 110576, 110579, 110581, 110587, 110589, 110590, 110592, 110888, 110898, 110898, 110928, 110930, 110933, 110933, 110948, 110952, 110960, 111355, 119552, 119638, 119648, 119670, 126980, 126980, 127183, 127183, 127374, 127374, 127377, 127386, 127406, 127406, 127488, 127490, 127504, 127547, 127552, 127560, 127568, 127569, 127584, 127589, 127744, 127776, 127789, 127797, 127799, 127868, 127870, 127891, 127904, 127946, 127951, 127955, 127968, 127984, 127988, 127988, 127992, 128062, 128064, 128064, 128066, 128252, 128255, 128317, 128331, 128334, 128336, 128359, 128378, 128378, 128405, 128406, 128420, 128420, 128507, 128591, 128640, 128709, 128716, 128716, 128720, 128722, 128725, 128729, 128732, 128735, 128747, 128748, 128756, 128764, 128986, 128986, 128992, 129003, 129008, 129008, 129292, 129338, 129340, 129349, 129351, 129535, 129648, 129660, 129664, 129734, 129736, 129736, 129740, 129757, 129759, 129771, 129775, 129786, 131072, 196605, 196608, 262141];

// node_modules/.pnpm/get-east-asian-width@1.7.0/node_modules/get-east-asian-width/utilities.js
var isInRange = (ranges, codePoint) => {
  let low = 0;
  let high = Math.floor(ranges.length / 2) - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const i = mid * 2;
    if (codePoint < ranges[i]) {
      high = mid - 1;
    } else if (codePoint > ranges[i + 1]) {
      low = mid + 1;
    } else {
      return true;
    }
  }
  return false;
};

// node_modules/.pnpm/get-east-asian-width@1.7.0/node_modules/get-east-asian-width/lookup.js
var commonCjkCodePoint = 19968;
var [wideFastPathStart, wideFastPathEnd] = /* @__PURE__ */ findWideFastPathRange(wideRanges);
function findWideFastPathRange(ranges) {
  let fastPathStart = ranges[0];
  let fastPathEnd = ranges[1];
  for (let index = 0; index < ranges.length; index += 2) {
    const start = ranges[index];
    const end = ranges[index + 1];
    if (commonCjkCodePoint >= start && commonCjkCodePoint <= end) {
      return [start, end];
    }
    if (end - start > fastPathEnd - fastPathStart) {
      fastPathStart = start;
      fastPathEnd = end;
    }
  }
  return [fastPathStart, fastPathEnd];
}
var isAmbiguous = (codePoint) => {
  if (codePoint < ambiguousMinimalCodePoint || codePoint > ambiguousMaximumCodePoint) {
    return false;
  }
  return isInRange(ambiguousRanges, codePoint);
};
var isFullwidth = (codePoint) => {
  if (codePoint < fullwidthMinimalCodePoint || codePoint > fullwidthMaximumCodePoint) {
    return false;
  }
  return isInRange(fullwidthRanges, codePoint);
};
var isWide = (codePoint) => {
  if (codePoint >= wideFastPathStart && codePoint <= wideFastPathEnd) {
    return true;
  }
  if (codePoint < wideMinimalCodePoint || codePoint > wideMaximumCodePoint) {
    return false;
  }
  return isInRange(wideRanges, codePoint);
};

// node_modules/.pnpm/get-east-asian-width@1.7.0/node_modules/get-east-asian-width/index.js
function validate(codePoint) {
  if (!Number.isSafeInteger(codePoint)) {
    throw new TypeError(`Expected a code point, got \`${typeof codePoint}\`.`);
  }
}
function eastAsianWidth(codePoint, { ambiguousAsWide = false } = {}) {
  validate(codePoint);
  if (isFullwidth(codePoint) || isWide(codePoint) || ambiguousAsWide && isAmbiguous(codePoint)) {
    return 2;
  }
  return 1;
}

// node_modules/.pnpm/string-width@7.2.0/node_modules/string-width/index.js
var import_emoji_regex = __toESM(require_emoji_regex(), 1);
var segmenter = new Intl.Segmenter();
var defaultIgnorableCodePointRegex = new RegExp("^\\p{Default_Ignorable_Code_Point}$", "u");
function stringWidth(string, options = {}) {
  if (typeof string !== "string" || string.length === 0) {
    return 0;
  }
  const {
    ambiguousIsNarrow = true,
    countAnsiEscapeCodes = false
  } = options;
  if (!countAnsiEscapeCodes) {
    string = stripAnsi(string);
  }
  if (string.length === 0) {
    return 0;
  }
  let width = 0;
  const eastAsianWidthOptions = { ambiguousAsWide: !ambiguousIsNarrow };
  for (const { segment: character } of segmenter.segment(string)) {
    const codePoint = character.codePointAt(0);
    if (codePoint <= 31 || codePoint >= 127 && codePoint <= 159) {
      continue;
    }
    if (codePoint >= 8203 && codePoint <= 8207 || codePoint === 65279) {
      continue;
    }
    if (codePoint >= 768 && codePoint <= 879 || codePoint >= 6832 && codePoint <= 6911 || codePoint >= 7616 && codePoint <= 7679 || codePoint >= 8400 && codePoint <= 8447 || codePoint >= 65056 && codePoint <= 65071) {
      continue;
    }
    if (codePoint >= 55296 && codePoint <= 57343) {
      continue;
    }
    if (codePoint >= 65024 && codePoint <= 65039) {
      continue;
    }
    if (defaultIgnorableCodePointRegex.test(character)) {
      continue;
    }
    if ((0, import_emoji_regex.default)().test(character)) {
      width += 2;
      continue;
    }
    width += eastAsianWidth(codePoint, eastAsianWidthOptions);
  }
  return width;
}

// node_modules/.pnpm/is-interactive@2.0.0/node_modules/is-interactive/index.js
function isInteractive({ stream = process.stdout } = {}) {
  return Boolean(
    stream && stream.isTTY && process.env.TERM !== "dumb" && !("CI" in process.env)
  );
}

// node_modules/.pnpm/is-unicode-supported@2.1.0/node_modules/is-unicode-supported/index.js
import process7 from "node:process";
function isUnicodeSupported2() {
  const { env: env2 } = process7;
  const { TERM, TERM_PROGRAM } = env2;
  if (process7.platform !== "win32") {
    return TERM !== "linux";
  }
  return Boolean(env2.WT_SESSION) || Boolean(env2.TERMINUS_SUBLIME) || env2.ConEmuTask === "{cmd::Cmder}" || TERM_PROGRAM === "Terminus-Sublime" || TERM_PROGRAM === "vscode" || TERM === "xterm-256color" || TERM === "alacritty" || TERM === "rxvt-unicode" || TERM === "rxvt-unicode-256color" || env2.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}

// node_modules/.pnpm/stdin-discarder@0.2.2/node_modules/stdin-discarder/index.js
import process8 from "node:process";
var ASCII_ETX_CODE = 3;
var StdinDiscarder = class {
  #activeCount = 0;
  start() {
    this.#activeCount++;
    if (this.#activeCount === 1) {
      this.#realStart();
    }
  }
  stop() {
    if (this.#activeCount <= 0) {
      throw new Error("`stop` called more times than `start`");
    }
    this.#activeCount--;
    if (this.#activeCount === 0) {
      this.#realStop();
    }
  }
  #realStart() {
    if (process8.platform === "win32" || !process8.stdin.isTTY) {
      return;
    }
    process8.stdin.setRawMode(true);
    process8.stdin.on("data", this.#handleInput);
    process8.stdin.resume();
  }
  #realStop() {
    if (!process8.stdin.isTTY) {
      return;
    }
    process8.stdin.off("data", this.#handleInput);
    process8.stdin.pause();
    process8.stdin.setRawMode(false);
  }
  #handleInput(chunk) {
    if (chunk[0] === ASCII_ETX_CODE) {
      process8.emit("SIGINT");
    }
  }
};
var stdinDiscarder = new StdinDiscarder();
var stdin_discarder_default = stdinDiscarder;

// node_modules/.pnpm/ora@8.2.0/node_modules/ora/index.js
var import_cli_spinners2 = __toESM(require_cli_spinners(), 1);
var Ora = class {
  #linesToClear = 0;
  #isDiscardingStdin = false;
  #lineCount = 0;
  #frameIndex = -1;
  #lastSpinnerFrameTime = 0;
  #options;
  #spinner;
  #stream;
  #id;
  #initialInterval;
  #isEnabled;
  #isSilent;
  #indent;
  #text;
  #prefixText;
  #suffixText;
  color;
  constructor(options) {
    if (typeof options === "string") {
      options = {
        text: options
      };
    }
    this.#options = {
      color: "cyan",
      stream: process9.stderr,
      discardStdin: true,
      hideCursor: true,
      ...options
    };
    this.color = this.#options.color;
    this.spinner = this.#options.spinner;
    this.#initialInterval = this.#options.interval;
    this.#stream = this.#options.stream;
    this.#isEnabled = typeof this.#options.isEnabled === "boolean" ? this.#options.isEnabled : isInteractive({ stream: this.#stream });
    this.#isSilent = typeof this.#options.isSilent === "boolean" ? this.#options.isSilent : false;
    this.text = this.#options.text;
    this.prefixText = this.#options.prefixText;
    this.suffixText = this.#options.suffixText;
    this.indent = this.#options.indent;
    if (process9.env.NODE_ENV === "test") {
      this._stream = this.#stream;
      this._isEnabled = this.#isEnabled;
      Object.defineProperty(this, "_linesToClear", {
        get() {
          return this.#linesToClear;
        },
        set(newValue) {
          this.#linesToClear = newValue;
        }
      });
      Object.defineProperty(this, "_frameIndex", {
        get() {
          return this.#frameIndex;
        }
      });
      Object.defineProperty(this, "_lineCount", {
        get() {
          return this.#lineCount;
        }
      });
    }
  }
  get indent() {
    return this.#indent;
  }
  set indent(indent = 0) {
    if (!(indent >= 0 && Number.isInteger(indent))) {
      throw new Error("The `indent` option must be an integer from 0 and up");
    }
    this.#indent = indent;
    this.#updateLineCount();
  }
  get interval() {
    return this.#initialInterval ?? this.#spinner.interval ?? 100;
  }
  get spinner() {
    return this.#spinner;
  }
  set spinner(spinner) {
    this.#frameIndex = -1;
    this.#initialInterval = void 0;
    if (typeof spinner === "object") {
      if (spinner.frames === void 0) {
        throw new Error("The given spinner must have a `frames` property");
      }
      this.#spinner = spinner;
    } else if (!isUnicodeSupported2()) {
      this.#spinner = import_cli_spinners.default.line;
    } else if (spinner === void 0) {
      this.#spinner = import_cli_spinners.default.dots;
    } else if (spinner !== "default" && import_cli_spinners.default[spinner]) {
      this.#spinner = import_cli_spinners.default[spinner];
    } else {
      throw new Error(`There is no built-in spinner named '${spinner}'. See https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json for a full list.`);
    }
  }
  get text() {
    return this.#text;
  }
  set text(value = "") {
    this.#text = value;
    this.#updateLineCount();
  }
  get prefixText() {
    return this.#prefixText;
  }
  set prefixText(value = "") {
    this.#prefixText = value;
    this.#updateLineCount();
  }
  get suffixText() {
    return this.#suffixText;
  }
  set suffixText(value = "") {
    this.#suffixText = value;
    this.#updateLineCount();
  }
  get isSpinning() {
    return this.#id !== void 0;
  }
  #getFullPrefixText(prefixText = this.#prefixText, postfix = " ") {
    if (typeof prefixText === "string" && prefixText !== "") {
      return prefixText + postfix;
    }
    if (typeof prefixText === "function") {
      return prefixText() + postfix;
    }
    return "";
  }
  #getFullSuffixText(suffixText = this.#suffixText, prefix = " ") {
    if (typeof suffixText === "string" && suffixText !== "") {
      return prefix + suffixText;
    }
    if (typeof suffixText === "function") {
      return prefix + suffixText();
    }
    return "";
  }
  #updateLineCount() {
    const columns = this.#stream.columns ?? 80;
    const fullPrefixText = this.#getFullPrefixText(this.#prefixText, "-");
    const fullSuffixText = this.#getFullSuffixText(this.#suffixText, "-");
    const fullText = " ".repeat(this.#indent) + fullPrefixText + "--" + this.#text + "--" + fullSuffixText;
    this.#lineCount = 0;
    for (const line of stripAnsi(fullText).split("\n")) {
      this.#lineCount += Math.max(1, Math.ceil(stringWidth(line, { countAnsiEscapeCodes: true }) / columns));
    }
  }
  get isEnabled() {
    return this.#isEnabled && !this.#isSilent;
  }
  set isEnabled(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("The `isEnabled` option must be a boolean");
    }
    this.#isEnabled = value;
  }
  get isSilent() {
    return this.#isSilent;
  }
  set isSilent(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("The `isSilent` option must be a boolean");
    }
    this.#isSilent = value;
  }
  frame() {
    const now = Date.now();
    if (this.#frameIndex === -1 || now - this.#lastSpinnerFrameTime >= this.interval) {
      this.#frameIndex = ++this.#frameIndex % this.#spinner.frames.length;
      this.#lastSpinnerFrameTime = now;
    }
    const { frames } = this.#spinner;
    let frame = frames[this.#frameIndex];
    if (this.color) {
      frame = source_default[this.color](frame);
    }
    const fullPrefixText = typeof this.#prefixText === "string" && this.#prefixText !== "" ? this.#prefixText + " " : "";
    const fullText = typeof this.text === "string" ? " " + this.text : "";
    const fullSuffixText = typeof this.#suffixText === "string" && this.#suffixText !== "" ? " " + this.#suffixText : "";
    return fullPrefixText + frame + fullText + fullSuffixText;
  }
  clear() {
    if (!this.#isEnabled || !this.#stream.isTTY) {
      return this;
    }
    this.#stream.cursorTo(0);
    for (let index = 0; index < this.#linesToClear; index++) {
      if (index > 0) {
        this.#stream.moveCursor(0, -1);
      }
      this.#stream.clearLine(1);
    }
    if (this.#indent || this.lastIndent !== this.#indent) {
      this.#stream.cursorTo(this.#indent);
    }
    this.lastIndent = this.#indent;
    this.#linesToClear = 0;
    return this;
  }
  render() {
    if (this.#isSilent) {
      return this;
    }
    this.clear();
    this.#stream.write(this.frame());
    this.#linesToClear = this.#lineCount;
    return this;
  }
  start(text) {
    if (text) {
      this.text = text;
    }
    if (this.#isSilent) {
      return this;
    }
    if (!this.#isEnabled) {
      if (this.text) {
        this.#stream.write(`- ${this.text}
`);
      }
      return this;
    }
    if (this.isSpinning) {
      return this;
    }
    if (this.#options.hideCursor) {
      cli_cursor_default.hide(this.#stream);
    }
    if (this.#options.discardStdin && process9.stdin.isTTY) {
      this.#isDiscardingStdin = true;
      stdin_discarder_default.start();
    }
    this.render();
    this.#id = setInterval(this.render.bind(this), this.interval);
    return this;
  }
  stop() {
    if (!this.#isEnabled) {
      return this;
    }
    clearInterval(this.#id);
    this.#id = void 0;
    this.#frameIndex = 0;
    this.clear();
    if (this.#options.hideCursor) {
      cli_cursor_default.show(this.#stream);
    }
    if (this.#options.discardStdin && process9.stdin.isTTY && this.#isDiscardingStdin) {
      stdin_discarder_default.stop();
      this.#isDiscardingStdin = false;
    }
    return this;
  }
  succeed(text) {
    return this.stopAndPersist({ symbol: log_symbols_default.success, text });
  }
  fail(text) {
    return this.stopAndPersist({ symbol: log_symbols_default.error, text });
  }
  warn(text) {
    return this.stopAndPersist({ symbol: log_symbols_default.warning, text });
  }
  info(text) {
    return this.stopAndPersist({ symbol: log_symbols_default.info, text });
  }
  stopAndPersist(options = {}) {
    if (this.#isSilent) {
      return this;
    }
    const prefixText = options.prefixText ?? this.#prefixText;
    const fullPrefixText = this.#getFullPrefixText(prefixText, " ");
    const symbolText = options.symbol ?? " ";
    const text = options.text ?? this.text;
    const separatorText = symbolText ? " " : "";
    const fullText = typeof text === "string" ? separatorText + text : "";
    const suffixText = options.suffixText ?? this.#suffixText;
    const fullSuffixText = this.#getFullSuffixText(suffixText, " ");
    const textToWrite = fullPrefixText + symbolText + fullText + fullSuffixText + "\n";
    this.stop();
    this.#stream.write(textToWrite);
    return this;
  }
};
function ora(options) {
  return new Ora(options);
}

// packages/shared/dist/types.js
var MODEL_FAMILIES = [
  "claude-opus",
  "claude-sonnet",
  "claude-haiku",
  "claude-other",
  "gpt-4",
  "gpt-5",
  "gpt-6",
  "gpt-other",
  "openai-o",
  "gemini",
  "cursor",
  "other"
];
var MCP_CATEGORIES = ["browser", "code-host", "docs", "database", "cloud", "issues", "chat", "memory", "design", "other"];
var CLI_CALLBACK_PORT = 54321;

// packages/shared/dist/languages.js
var EXT = {
  ts: { language: "TypeScript" },
  tsx: { language: "TypeScript", framework: "React" },
  mts: { language: "TypeScript" },
  cts: { language: "TypeScript" },
  js: { language: "JavaScript" },
  jsx: { language: "JavaScript", framework: "React" },
  mjs: { language: "JavaScript" },
  cjs: { language: "JavaScript" },
  vue: { language: "JavaScript", framework: "Vue" },
  svelte: { language: "JavaScript", framework: "Svelte" },
  py: { language: "Python" },
  ipynb: { language: "Python", framework: "Jupyter" },
  rs: { language: "Rust" },
  go: { language: "Go" },
  c: { language: "C" },
  h: { language: "C" },
  cc: { language: "C++" },
  cpp: { language: "C++" },
  cxx: { language: "C++" },
  hpp: { language: "C++" },
  zig: { language: "Zig" },
  java: { language: "Java" },
  kt: { language: "Kotlin" },
  kts: { language: "Kotlin" },
  swift: { language: "Swift" },
  m: { language: "Objective-C" },
  mm: { language: "Objective-C" },
  dart: { language: "Dart", framework: "Flutter" },
  rb: { language: "Ruby" },
  php: { language: "PHP" },
  cs: { language: "C#" },
  scala: { language: "Scala" },
  ex: { language: "Elixir" },
  exs: { language: "Elixir" },
  hs: { language: "Haskell" },
  ml: { language: "OCaml" },
  lua: { language: "Lua" },
  sql: { language: "SQL" },
  sh: { language: "Shell" },
  bash: { language: "Shell" },
  zsh: { language: "Shell" },
  css: { language: "CSS" },
  scss: { language: "CSS" },
  html: { language: "HTML" },
  sol: { language: "Solidity" }
};
function languageFromPath(path2) {
  const base = path2.split(/[\\/]/).pop() ?? path2;
  const dot = base.lastIndexOf(".");
  if (dot <= 0)
    return null;
  const ext = base.slice(dot + 1).toLowerCase();
  return EXT[ext] ?? null;
}
var TEST_RE = /(\.|_)(test|spec)\.[a-z0-9]+$|(^|[\\/])(__tests__|tests?|spec)[\\/]|_test\.(go|py)$|^test_.*\.py$/i;
function isTestPath(path2) {
  const base = path2.split(/[\\/]/).pop() ?? path2;
  return TEST_RE.test(path2) || /^test_.*\.py$/i.test(base);
}
var BOILERPLATE_RE = /(^|[\\/])(node_modules|vendor|dist|build|out|\.next|target|coverage|__generated__|generated|Pods|\.venv|venv)[\\/]|(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|bun\.lockb|Cargo\.lock|go\.sum|poetry\.lock|Gemfile\.lock|composer\.lock)$|\.min\.(js|css)$|\.(map|snap|lock|pb\.go|g\.dart|freezed\.dart)$|_pb2\.py$/i;
function isBoilerplatePath(path2) {
  return BOILERPLATE_RE.test(path2);
}
function pathDepth(path2) {
  return Math.max(0, path2.split(/[\\/]/).filter(Boolean).length - 1);
}
var SYSTEMS_LANGUAGES = /* @__PURE__ */ new Set(["Rust", "Go", "C", "C++", "Zig"]);

// packages/shared/dist/archetype.js
var clamp01 = (n) => Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0;
var ARCHETYPES = [
  {
    name: "Surgical Architect",
    icon: "Scissors",
    tagline: "Deep, careful refactors that stick.",
    traits: ["High multi-file refactor depth", "Very low 24h revert rate", "Changes land once and stay landed"],
    accent: "violet"
  },
  {
    name: "Multi-Agent Orchestrator",
    icon: "Network",
    tagline: "Runs AI agents like a well-tuned build system.",
    traits: ["Runs several AI coding agents together", "Efficient tool calls per agent session", "AI output survives review"],
    accent: "cyan"
  },
  {
    name: "Test-Driven Purist",
    icon: "FlaskConical",
    tagline: "Tests first, tests always.",
    traits: ["High test-to-source line ratio", "Tests ship in the same commits as code", "Low regression churn"],
    accent: "emerald"
  },
  {
    name: "10x Velocity Shipper",
    icon: "Rocket",
    tagline: "Ships a lot, and it survives.",
    traits: ["High net surviving lines", "Commits on most days", "Volume without slop"],
    accent: "amber"
  },
  {
    name: "Systems Craftsman",
    icon: "Cpu",
    tagline: "Lives close to the metal.",
    traits: ["Heavy Rust / Go / C++ footprint", "Deep module hierarchies", "Typed, structured codebases"],
    accent: "rose"
  },
  {
    name: "Full-Stack Polymath",
    icon: "Layers",
    tagline: "Strong across three or more stacks.",
    traits: ["3+ stacks rated 60 or higher", "Balanced language spread", "Moves between layers fluently"],
    accent: "sky"
  }
];
function archetypeInfo(name) {
  return ARCHETYPES.find((a) => a.name === name) ?? ARCHETYPES[0];
}
function archetypeScores(f) {
  const strongStacks = f.stack.filter((s) => s.stackRating >= 60 && s.percentage >= 8);
  const top3 = [...strongStacks].sort((a, b) => b.stackRating - a.stackRating).slice(0, 3);
  const usesAgents = f.tools.claudeCode || f.tools.cursor || f.tools.codex;
  return {
    "Surgical Architect": 0.6 * clamp01(f.refactorRatio / 0.35) + 0.4 * (1 - clamp01(f.revertRate / 0.1)),
    "Multi-Agent Orchestrator": usesAgents ? (f.tools.primaryTool === "Hybrid" ? 1 : 0.75) * (0.5 * clamp01(f.toolCallsPerSession / 25) + 0.5 * f.aiSurvival) : 0,
    "Test-Driven Purist": clamp01(f.testRatio / 0.4),
    "10x Velocity Shipper": 0.6 * clamp01(f.netSurvivingLines / 2e4) + 0.4 * f.consistency,
    "Systems Craftsman": clamp01((f.systemsShare + 0.4 * f.typescriptShare) / 0.6) * (0.6 + 0.4 * clamp01(f.avgDepth / 5)),
    "Full-Stack Polymath": top3.length >= 3 ? top3.reduce((s, e) => s + e.stackRating, 0) / 300 : 0
  };
}
function classifyArchetype(f) {
  const scores = archetypeScores(f);
  let best = ARCHETYPES[0].name;
  let bestScore = -1;
  for (const a of ARCHETYPES) {
    const s = Math.round(scores[a.name] * 1e6);
    if (s > bestScore) {
      best = a.name;
      bestScore = s;
    }
  }
  return best;
}

// packages/shared/dist/scoring.js
var DAY = 86400;
var WEIGHTS = { rigor: 0.4, aiSurvival: 0.3, stackComplexity: 0.3 };
var clamp012 = (n) => Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0;
var round1 = (n) => Math.round(n * 10) / 10;
var safeDiv = (a, b) => b > 0 ? a / b : 0;
function isRefactor(c) {
  if (c.files.length < 3)
    return false;
  const added = c.files.reduce((s, f) => s + f.added, 0);
  const deleted = c.files.reduce((s, f) => s + f.deleted, 0);
  return deleted > 0 && deleted >= added * 0.3;
}
function windowStats(commits, now, windowDays) {
  const days = /* @__PURE__ */ new Set();
  const byLanguage = /* @__PURE__ */ new Map();
  let linesAdded = 0, testLines = 0, reverts = 0, churned = 0, refactorCommits = 0, totalFileTouches = 0;
  let depthSum = 0, depthN = 0, aiLinesAdded = 0, aiChurned = 0, humanLinesAdded = 0;
  let minTs = Infinity;
  const windowStart = now - windowDays * DAY;
  for (const c of commits) {
    if (c.timestamp >= windowStart) {
      days.add(Math.floor(c.timestamp / DAY));
      minTs = Math.min(minTs, c.timestamp);
    }
    const added = c.files.reduce((s, f) => s + f.added, 0);
    linesAdded += added;
    churned += Math.min(c.churnedLines24h, added);
    if (c.isRevert || added > 0 && c.churnedLines24h / added > 0.5)
      reverts++;
    if (isRefactor(c))
      refactorCommits++;
    totalFileTouches += c.files.length;
    if (c.aiAssisted) {
      aiLinesAdded += added;
      aiChurned += Math.min(c.churnedLines24h, added);
    } else {
      humanLinesAdded += added;
    }
    const langsInCommit = /* @__PURE__ */ new Set();
    for (const f of c.files) {
      depthSum += f.depth;
      depthN++;
      if (f.isTest)
        testLines += f.added;
      let ls = byLanguage.get(f.language);
      if (!ls) {
        ls = { lines: 0, testLines: 0, commits: 0, frameworkVotes: /* @__PURE__ */ new Map() };
        byLanguage.set(f.language, ls);
      }
      ls.lines += f.added;
      if (f.isTest)
        ls.testLines += f.added;
      if (f.framework)
        ls.frameworkVotes.set(f.framework, (ls.frameworkVotes.get(f.framework) ?? 0) + f.added + 1);
      langsInCommit.add(f.language);
    }
    for (const l of langsInCommit)
      byLanguage.get(l).commits++;
  }
  for (const ls of byLanguage.values()) {
    let best, bestVotes = 0;
    for (const [fw, v] of [...ls.frameworkVotes].sort((a, b) => a[0].localeCompare(b[0]))) {
      if (v > bestVotes) {
        best = fw;
        bestVotes = v;
      }
    }
    if (best && bestVotes >= ls.lines * 0.2)
      ls.framework = best;
  }
  const spanDays = Number.isFinite(minTs) ? Math.min(windowDays, Math.max(1, Math.ceil((now - minTs) / DAY))) : windowDays;
  return {
    commits: commits.length,
    linesAdded,
    testLines,
    sourceLines: linesAdded - testLines,
    reverts,
    churned,
    refactorCommits,
    totalFileTouches,
    activeDays: days.size,
    spanDays,
    avgDepth: safeDiv(depthSum, depthN),
    aiLinesAdded,
    aiChurned,
    humanLinesAdded,
    netSurvivingLines: linesAdded - churned,
    byLanguage
  };
}
function compute(stats) {
  const testRatio = safeDiv(stats.testLines, stats.linesAdded);
  const revertRate = safeDiv(stats.reverts, stats.commits);
  const refactorRatio = safeDiv(stats.refactorCommits, stats.commits);
  const consistency = clamp012(safeDiv(stats.activeDays, stats.spanDays * 0.5));
  const rigor = stats.commits === 0 ? 0 : 0.3 * clamp012(testRatio / 0.3) + 0.25 * (1 - clamp012(revertRate / 0.15)) + 0.25 * clamp012(refactorRatio / 0.35) + 0.2 * consistency;
  const aiScoped = stats.aiLinesAdded > 0;
  const survival = aiScoped ? 1 - safeDiv(stats.aiChurned, stats.aiLinesAdded) : 1 - safeDiv(stats.churned, stats.linesAdded);
  const humanEditRatio = safeDiv(stats.humanLinesAdded, stats.linesAdded);
  const refine = clamp012(1 - Math.abs(humanEditRatio - 0.45) / 0.55);
  const aiSurvival = stats.linesAdded === 0 ? 0 : 0.7 * clamp012(survival) + 0.3 * refine;
  const shares = [...stats.byLanguage.values()].map((l) => safeDiv(l.lines, stats.linesAdded)).filter((s) => s > 0);
  const meaningful = shares.filter((s) => s >= 0.05).length;
  const entropy = -shares.reduce((s, p) => s + p * Math.log2(p), 0);
  const diversity = 0.5 * clamp012(meaningful / 4) + 0.5 * clamp012(entropy / 2);
  const depth = clamp012(stats.avgDepth / 5);
  const volume = clamp012(Math.log10(1 + Math.max(0, stats.netSurvivingLines)) / 5);
  const stackComplexity = stats.linesAdded === 0 ? 0 : 0.4 * diversity + 0.3 * depth + 0.3 * volume;
  const overall = WEIGHTS.rigor * rigor + WEIGHTS.aiSurvival * aiSurvival + WEIGHTS.stackComplexity * stackComplexity;
  return { rigor, aiSurvival, stackComplexity, overall, survival: clamp012(survival), humanEditRatio, testRatio, revertRate, refactorRatio, consistency, stats };
}
function stackBreakdown(stats, survival) {
  return [...stats.byLanguage.entries()].map(([language, l]) => {
    const testScore = clamp012(safeDiv(l.testLines, l.lines) / 0.3);
    const rating = Math.round(100 * (0.35 * clamp012(Math.log10(1 + l.lines) / 4) + 0.25 * clamp012(l.commits / 50) + 0.2 * testScore + 0.2 * survival));
    const entry = {
      language,
      percentage: round1(100 * safeDiv(l.lines, stats.linesAdded)),
      stackRating: rating,
      verifiedCommits: l.commits
    };
    if (l.framework)
      entry.framework = l.framework;
    return entry;
  }).filter((e) => e.percentage > 0 || e.verifiedCommits > 0).sort((a, b) => b.percentage - a.percentage || b.stackRating - a.stackRating || a.language.localeCompare(b.language)).slice(0, 8);
}
function detectTools(input) {
  const counts = [
    ["Claude Code", input.ai.claudeCode.detected ? input.ai.claudeCode.sessions : 0],
    ["Cursor", input.ai.cursor.detected ? input.ai.cursor.sessions : 0],
    ["Codex", input.ai.codex?.detected ? input.ai.codex.sessions : 0]
  ];
  const used = counts.filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]);
  let primaryTool = "Git-Only";
  if (used.length === 1)
    primaryTool = used[0][0];
  else if (used.length > 1) {
    primaryTool = used[0][1] > 3 * used[1][1] ? used[0][0] : "Hybrid";
  }
  return {
    claudeCode: counts[0][1] > 0,
    cursor: counts[1][1] > 0,
    codex: counts[2][1] > 0,
    primaryTool
  };
}
var isoDay = (ts) => new Date(ts * 1e3).toISOString().slice(0, 10);
function languageTimeline(commits) {
  const by = /* @__PURE__ */ new Map();
  for (const c of commits) {
    const month = isoDay(c.timestamp).slice(0, 7);
    for (const lang of new Set(c.files.filter((f) => f.added + f.deleted > 0).map((f) => f.language))) {
      const e = by.get(lang) ?? { first: c.timestamp, last: c.timestamp, months: /* @__PURE__ */ new Set(), commits: 0 };
      e.first = Math.min(e.first, c.timestamp);
      e.last = Math.max(e.last, c.timestamp);
      e.months.add(month);
      e.commits++;
      by.set(lang, e);
    }
  }
  return [...by.entries()].map(([language, e]) => ({
    language,
    firstCommitAt: isoDay(e.first),
    lastCommitAt: isoDay(e.last),
    activeMonths: e.months.size,
    commits: e.commits
  })).sort((a, b) => b.commits - a.commits || a.language.localeCompare(b.language)).slice(0, 8);
}
var to1000 = (n) => Math.round(1e3 * clamp012(n));
function computeScan(input, meta) {
  const commits = [...input.commits].sort((a, b) => a.timestamp - b.timestamp);
  const all = compute(windowStats(commits, input.now, 90));
  const recent = compute(windowStats(commits.filter((c) => c.timestamp >= input.now - 30 * DAY), input.now, 30));
  const tools = detectTools(input);
  const cc = input.ai.claudeCode;
  const codex = input.ai.codex ?? { detected: false, sessions: 0, toolCalls: 0 };
  const sessions = cc.sessions + input.ai.cursor.sessions + codex.sessions;
  const stack = stackBreakdown(all.stats, all.survival);
  const rigorMetrics = {
    testCoverageDelta: round1(100 * safeDiv(all.stats.testLines, all.stats.sourceLines)),
    revertRate24h: round1(100 * all.revertRate),
    avgFilesPerCommit: round1(safeDiv(all.stats.totalFileTouches, all.stats.commits)),
    refactorRatio: round1(100 * all.refactorRatio)
  };
  const aiMetrics = {
    aiSurvivalRate: round1(100 * all.survival),
    humanEditRatio: round1(100 * all.humanEditRatio),
    agentSessionsAnalyzed: sessions,
    toolCallsPerSession: round1(safeDiv(cc.toolCalls + codex.toolCalls, cc.sessions + codex.sessions))
  };
  const subScores = {
    rigor: to1000(all.rigor),
    aiSurvival: to1000(all.aiSurvival),
    stackComplexity: to1000(all.stackComplexity)
  };
  const systemsShare = stack.filter((s) => SYSTEMS_LANGUAGES.has(s.language)).reduce((s, e) => s + e.percentage, 0) / 100;
  const tsShare = stack.filter((s) => s.language === "TypeScript").reduce((s, e) => s + e.percentage, 0) / 100;
  const features = {
    refactorRatio: all.refactorRatio,
    revertRate: all.revertRate,
    testRatio: all.testRatio,
    consistency: all.consistency,
    netSurvivingLines: all.stats.netSurvivingLines,
    aiSurvival: all.survival,
    toolCallsPerSession: aiMetrics.toolCallsPerSession,
    tools,
    systemsShare,
    typescriptShare: tsShare,
    avgDepth: all.stats.avgDepth,
    stack
  };
  return {
    schemaVersion: 2,
    cliVersion: meta.cliVersion,
    machineFingerprint: meta.machineFingerprint,
    generatedAt: new Date(input.now * 1e3).toISOString(),
    overallScore: to1000(all.overall),
    rolling30dScore: to1000(recent.overall),
    subScores,
    stackBreakdown: stack,
    aiToolsDetected: tools,
    rigorMetrics,
    aiMetrics,
    archetype: classifyArchetype(features),
    reposAnalyzed: input.reposAnalyzed,
    commitsAnalyzed: commits.length,
    languageTimeline: languageTimeline(commits),
    evidence: meta.evidence ?? { nonce: null, commits: [] },
    ...input.sessionAnalysis ? { sessionAnalysis: input.sessionAnalysis } : {}
  };
}

// packages/shared/dist/integrity.js
function canonicalize(value) {
  if (value === null || typeof value !== "object") {
    if (typeof value === "number" && !Number.isFinite(value))
      return "null";
    return JSON.stringify(value) ?? "null";
  }
  if (Array.isArray(value))
    return `[${value.map((v) => v === void 0 ? "null" : canonicalize(v)).join(",")}]`;
  const obj = value;
  const keys = Object.keys(obj).filter((k) => obj[k] !== void 0).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${canonicalize(obj[k])}`).join(",")}}`;
}
async function sha256Hex(input) {
  const data = new TextEncoder().encode(input);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function stripHash(payload) {
  const { integrityHash: _ignored, ...rest } = payload;
  return rest;
}
async function computeIntegrityHash(payload) {
  const unsigned = stripHash(payload);
  return sha256Hex(`${canonicalize(unsigned)}|${unsigned.cliVersion}|${unsigned.machineFingerprint}`);
}
async function signPayload(payload) {
  return { ...payload, integrityHash: await computeIntegrityHash(payload) };
}

// packages/shared/dist/validate.js
var MAX_EVIDENCE_COMMITS = 1e3;

// packages/shared/dist/sessions.js
function modelFamily(model) {
  if (!model)
    return null;
  const m = model.toLowerCase().trim();
  if (!m || m === "default" || m === "<synthetic>" || m === "auto")
    return null;
  if (m.includes("claude") || /^(opus|sonnet|haiku)\b/.test(m)) {
    if (m.includes("opus"))
      return "claude-opus";
    if (m.includes("sonnet"))
      return "claude-sonnet";
    if (m.includes("haiku"))
      return "claude-haiku";
    return "claude-other";
  }
  const gpt = /(?:^|[^a-z])gpt-?(\d+)/.exec(m);
  if (gpt)
    return gpt[1] === "4" ? "gpt-4" : gpt[1] === "5" ? "gpt-5" : gpt[1] === "6" ? "gpt-6" : "gpt-other";
  if (/^o\d/.test(m) || m.startsWith("codex-mini"))
    return "openai-o";
  if (m.includes("gemini"))
    return "gemini";
  if (m.startsWith("composer") || m.startsWith("cursor"))
    return "cursor";
  return "other";
}
var MCP_RULES = [
  [/browser|playwright|puppeteer|chrome|selenium|webdriver|navigate|screenshot/, "browser"],
  [/github|gitlab|bitbucket|\bgit\b|pull_request|pr_/, "code-host"],
  [/postgres|mysql|sqlite|supabase|mongo|redis|database|\bsql\b|bigquery|snowflake|neon|prisma|clickhouse/, "database"],
  [/aws|gcp|azure|vercel|netlify|cloudflare|kubernetes|k8s|docker|terraform|sentry|datadog|grafana|heroku|fly\b|render/, "cloud"],
  [/jira|linear|atlassian|confluence|asana|trello|clickup|notion|monday|shortcut|issue/, "issues"],
  [/slack|discord|teams|gmail|mail|email|calendar|telegram|whatsapp|chat/, "chat"],
  [/memory|mem0|remember|knowledge.?graph|recall|goldfish|history/, "memory"],
  [/figma|design|canva|sketch|excalidraw/, "design"],
  [/context7|docs|documentation|search|fetch|wiki|deepwiki|reference|exa|tavily|brave|perplexity|web/, "docs"]
];
function mcpCategory(name) {
  const n = name.toLowerCase().replace(/[-_.]+/g, " ").replace(/\s+/g, "_");
  const spaced = n.replace(/_/g, " ");
  for (const [re, cat] of MCP_RULES)
    if (re.test(spaced) || re.test(n))
      return cat;
  return "other";
}
var WRAPPER = /^(?:sudo|time|nice|env|npx|bunx|pnpx|uvx|dotenv|cross-env|(?:pnpm|npm|yarn|bun)\s+exec|uv\s+run|poetry\s+run|pipenv\s+run|hatch\s+run|pdm\s+run|rye\s+run|bundle\s+exec|python3?\s+-m|go\s+run\s+\S+)\s+/;
var ENV_ASSIGN = /^[A-Za-z_][A-Za-z0-9_]*=\S*\s+/;
var PM_SCRIPT = /^(?:pnpm|npm|yarn|bun)\b(?:\s+(?:-r|--recursive|-w|--workspace-root|--filter[= ]\S+|-F\s*\S+|--if-present|--silent|-s|--prefix[= ]\S+|-C\s*\S+|workspaces?\s+(?:foreach\s+)?\S*|--workspace[= ]\S+))*\s+(?:run\s+(?:--if-present\s+)?)?(\S+)/;
var TEST_CMD = /^(?:jest|vitest|mocha|ava|tap|jasmine|karma|pytest|py\.test|tox|nox|phpunit|pest|rspec|cucumber|behave|ctest|playwright\s+test|cypress\s+run|go\s+test|cargo\s+(?:test|nextest)|dotnet\s+test|mvn\b.*\b(?:test|verify)\b|(?:\.\/)?gradlew?\b.*\b(?:test|check|connectedCheck)\b|swift\s+test|xcodebuild\b.*\btest\b|mix\s+test|deno\s+test|bun\s+test|node\s+(?:--\S+\s+)*--test|unittest|rake\s+(?:test|spec)|rails\s+test|flutter\s+test|dart\s+test|zig\s+build\s+test|make\s+(?:test|check|tests|unit|e2e)\b|just\s+test|turbo\s+(?:run\s+)?test|nx\s+(?:run-many\s+.*)?test)\b/;
var BUILD_CMD = /^(?:tsc|vue-tsc|next\s+build|vite\s+build|webpack|esbuild|rollup|tsup|turbo\s+(?:run\s+)?(?:build|typecheck)|nx\s+(?:run-many\s+.*)?build|cargo\s+(?:build|check)|go\s+(?:build|vet)|dotnet\s+build|mvn\b.*\b(?:compile|package|install)\b|(?:\.\/)?gradlew?\b.*\b(?:build|assemble\w*)\b|swift\s+build|xcodebuild\b|make\b(?:\s+(?:build|all))?$|cmake\s+--build|ninja|bazel\s+build|zig\s+build|flutter\s+build|docker\s+build|mypy|pyright|sorbet)\b/;
var LINT_CMD = /^(?:eslint|oxlint|biome\s+(?:check|lint|ci)|prettier\s+.*--check|stylelint|ruff(?:\s+(?:check|format\s+--check))?|flake8|pylint|black\s+.*--check|isort\s+.*--check|golangci-lint|staticcheck|gofmt\s+-l|cargo\s+(?:clippy|fmt\s+.*--check)|rubocop|standardrb|shellcheck|hadolint|swiftlint|ktlint|detekt|markdownlint|actionlint)\b/;
var SCRIPT_CHECK = [
  [/^(?:test|tests|spec|e2e|ci|check)(?::\S+)?$/, "test"],
  [/^(?:build|typecheck|type-check|tsc|compile|types|check-types)(?::\S+)?$/, "build"],
  [/^(?:lint|format:check|fmt:check|prettier:check|stylelint)(?::\S+)?$/, "lint"]
];
var EXPLORE_CMD = /^(?:ls|ll|cat|bat|head|tail|less|more|grep|egrep|rg|ag|ack|find|fd|tree|wc|file|stat|du|pwd|which|type|nl|sed\s+-n|awk|jq|git\s+(?:status|log|diff|show|blame|grep|ls-files|branch|remote|rev-parse|shortlog))\b/;
var RANK = { lint: 1, build: 2, test: 3 };
function stripWrappers(segment) {
  let s = segment.trim().replace(/^\(+/, "");
  for (let i = 0; i < 6; i++) {
    const next = s.replace(ENV_ASSIGN, "").replace(WRAPPER, "").replace(/^cd\s+\S+\s*$/, "");
    if (next === s)
      break;
    s = next.trim();
  }
  return s;
}
function segmentCheck(s) {
  const pm = PM_SCRIPT.exec(s);
  if (pm) {
    const script = pm[1];
    for (const [re, kind] of SCRIPT_CHECK)
      if (re.test(script))
        return kind;
    const rest = s.slice(pm.index + pm[0].length - script.length);
    if (TEST_CMD.test(rest))
      return "test";
    if (LINT_CMD.test(rest))
      return "lint";
    if (BUILD_CMD.test(rest) && !/^make\b/.test(rest))
      return "build";
    return null;
  }
  if (TEST_CMD.test(s))
    return "test";
  if (LINT_CMD.test(s))
    return "lint";
  if (BUILD_CMD.test(s))
    return "build";
  return null;
}
function pathArgs(s, verb) {
  return s.replace(verb, "").split(/\s+/).filter((a) => a && a !== "--" && !a.startsWith("-")).map((a) => a.replace(/^["']|["']$/g, ""));
}
function classifyCommand(command) {
  const raw = Array.isArray(command) ? command.length >= 3 && /(?:^|\/)(?:ba|z)?sh$/.test(command[0]) && command[1] === "-lc" ? command[2] : command.join(" ") : command;
  if (typeof raw !== "string" || raw.length === 0)
    return { kind: "other" };
  const text = raw.length > 4e3 ? raw.slice(0, 4e3) : raw;
  const parts = text.split(/(\n|&&|\|\||;|\|(?!\|))/);
  const segIdx = [];
  const segments = [];
  for (let i = 0; i < parts.length; i += 2) {
    const seg = stripWrappers(parts[i] ?? "");
    if (seg) {
      segments.push(seg);
      segIdx.push(i);
    }
  }
  const lastSeg = segIdx.length ? segIdx[segIdx.length - 1] : -1;
  const pipefail = /\bpipefail\b/.test(text);
  let best = null;
  let bestAt = -1;
  let undo = null;
  let commit = false;
  let explore = segments.length > 0;
  for (let i = 0; i < segments.length; i++) {
    const s = segments[i];
    const c = segmentCheck(s);
    if (c && (!best || RANK[c] > RANK[best])) {
      best = c;
      bestAt = i;
    }
    if (/^git\s+(?:reset\s+(?:.*\s)?--hard|stash(?:\s+(?:push|save)\b.*)?$|checkout\s+(?:--\s+)?\.$|restore\s+(?:--\S+\s+)*\.$|clean\s+-\S*f)/.test(s))
      undo = "all";
    else if (undo !== "all" && /^git\s+restore\b/.test(s))
      undo = [...undo ?? [], ...pathArgs(s, /^git\s+restore\b/)];
    else if (undo !== "all" && /^git\s+checkout\s+(?:\S+\s+)?--\s+\S/.test(s))
      undo = [...undo ?? [], ...pathArgs(s.replace(/^git\s+checkout\s+(?:\S+\s+)?--/, ""), /^/)];
    if (/^git\s+commit\b/.test(s))
      commit = true;
    if (!EXPLORE_CMD.test(s))
      explore = false;
  }
  if (best) {
    const seps = [];
    for (let i = segIdx[bestAt] + 1; i < lastSeg; i += 2)
      seps.push(parts[i]);
    const outcomeVisible = seps.every((sep) => sep === "&&" || sep === "|" && pipefail);
    return { kind: "check", check: best, outcomeVisible };
  }
  if (undo && (undo === "all" || undo.length > 0))
    return { kind: "undo", paths: undo };
  if (commit)
    return { kind: "commit" };
  if (explore)
    return { kind: "explore" };
  return { kind: "other" };
}
function fnv(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
var SessionFiles = class {
  ids = /* @__PURE__ */ new Map();
  edits = /* @__PURE__ */ new Set();
  /** The integer for this path (normalised: slashes, case kept, trailing ./ dropped). */
  id(path2) {
    const p = path2.replace(/\\/g, "/").replace(/^\.\//, "");
    let id = this.ids.get(p);
    if (id === void 0) {
      id = this.ids.size + 1;
      this.ids.set(p, id);
    }
    return id;
  }
  /** Ids of files already seen whose path ends with one of these arguments (git restore src/a.ts → the a.ts we edited). */
  match(args) {
    const out = /* @__PURE__ */ new Set();
    for (const a of args) {
      const arg = a.replace(/\\/g, "/").replace(/^\.\//, "").replace(/\/+$/, "");
      if (!arg)
        continue;
      for (const [p, id] of this.ids)
        if (p === arg || p.endsWith(`/${arg}`) || p.startsWith(`${arg}/`) || p.includes(`/${arg}/`))
          out.add(id);
    }
    return [...out].sort((x, y) => x - y);
  }
  /**
   * Records an edit (before → after text of the changed region, or content ids). Returns true when it exactly reverses
   * an earlier edit of the same file.
   */
  edit(file, before, after) {
    if (before === after)
      return false;
    const a = fnv(before);
    const b = fnv(after);
    const reverses = this.edits.has(`${file}:${b}:${a}`);
    this.edits.add(`${file}:${a}:${b}`);
    return reverses;
  }
};
var IDLE_CAP_SEC = 15 * 60;
var EXPLORE_FIRST_MIN = 3;
var round12 = (n) => Math.round(n * 10) / 10;
function percentile(sorted, p) {
  if (sorted.length === 0)
    return null;
  const i = Math.min(sorted.length - 1, Math.max(0, Math.ceil(p / 100 * sorted.length) - 1));
  return sorted[i];
}
function spread(values) {
  const s = [...values].sort((a, b) => a - b);
  const p50 = percentile(s, 50);
  const p90 = percentile(s, 90);
  return { p50: p50 === null ? null : round12(p50), p90: p90 === null ? null : round12(p90) };
}
var median = (values) => spread(values).p50;
function factsOf(trace) {
  const ev = trace.events;
  const times = ev.map((e) => e.t).filter((t) => typeof t === "number" && Number.isFinite(t));
  let active = 0;
  for (let i = 1; i < times.length; i++) {
    const gap = times[i] - times[i - 1];
    if (gap > 0)
      active += Math.min(gap, IDLE_CAP_SEC);
  }
  const f = {
    minutes: times.length >= 2 ? active / 60 : null,
    toolCalls: 0,
    turns: 0,
    day: times.length ? new Date(Math.min(...times) * 1e3).toISOString().slice(0, 10) : null,
    edits: 0,
    exploreBeforeEdit: null,
    exploreFirst: false,
    usedPlanTool: false,
    editsBeforeFirstCheck: null,
    checkedAfterEdit: false,
    runs: { test: 0, build: 0, lint: 0 },
    runsWithOutcome: 0,
    failing: 0,
    fixLoops: 0,
    redToGreenMin: null,
    lastOutcome: null,
    undone: 0,
    reworked: 0,
    corrections: 0,
    interrupts: 0,
    denials: 0,
    userModified: 0,
    prompts: 0,
    subagentCalls: 0,
    mcp: /* @__PURE__ */ new Map()
  };
  let exploreCount = 0;
  let planBeforeEdit = false;
  const editLog = [];
  let failedPending = false;
  let editSinceFail = false;
  let firstFailT = null;
  let firstFailIdx = -1;
  let turnTargets = /* @__PURE__ */ new Set();
  let prevTurnTargets = /* @__PURE__ */ new Set();
  let afterPromptWithPriorEdits = false;
  let correctedThisTurn = false;
  const markUndone = (pred) => {
    for (const e of editLog)
      if (!e.undone && !e.committed && pred(e)) {
        e.undone = true;
        f.undone++;
      }
  };
  ev.forEach((e, idx) => {
    if (e.type === "prompt") {
      f.prompts++;
      f.turns++;
      prevTurnTargets = turnTargets;
      turnTargets = /* @__PURE__ */ new Set();
      afterPromptWithPriorEdits = prevTurnTargets.size > 0;
      correctedThisTurn = false;
      return;
    }
    if (e.type === "interrupt") {
      f.interrupts++;
      return;
    }
    f.toolCalls++;
    if (e.interrupted)
      f.interrupts++;
    if (e.denied)
      f.denials++;
    if (e.kind === "subagent")
      f.subagentCalls++;
    if (e.kind === "mcp") {
      const c = e.mcp ?? "other";
      f.mcp.set(c, (f.mcp.get(c) ?? 0) + 1);
    }
    if (e.kind === "plan")
      f.usedPlanTool = true;
    if (e.denied)
      return;
    if (f.edits === 0 && (e.kind === "explore" || e.kind === "plan" || e.kind === "subagent")) {
      exploreCount++;
      if (e.kind === "plan")
        planBeforeEdit = true;
    }
    if (e.kind === "edit") {
      if (f.edits === 0) {
        f.exploreBeforeEdit = exploreCount;
        f.exploreFirst = exploreCount >= EXPLORE_FIRST_MIN || planBeforeEdit;
      }
      f.edits++;
      if (e.userModified)
        f.userModified++;
      if (e.reverts && e.target !== void 0) {
        for (let i = editLog.length - 1; i >= 0; i--) {
          const prior = editLog[i];
          if (prior.target === e.target && !prior.undone) {
            prior.undone = true;
            f.undone++;
            break;
          }
        }
      }
      if (afterPromptWithPriorEdits && e.target !== void 0 && prevTurnTargets.has(e.target)) {
        f.reworked++;
        if (!correctedThisTurn) {
          f.corrections++;
          correctedThisTurn = true;
        }
      }
      if (e.target !== void 0)
        turnTargets.add(e.target);
      editLog.push({ target: e.target, undone: false, committed: false });
      if (failedPending)
        editSinceFail = true;
      return;
    }
    if (e.kind === "shell") {
      if (e.commits)
        for (const x of editLog)
          x.committed = true;
      if (e.undoes) {
        const u = e.undoes;
        const before = f.undone;
        markUndone((x) => u === "all" || x.target !== void 0 && u.includes(x.target));
        if (afterPromptWithPriorEdits && !correctedThisTurn && f.undone > before) {
          f.corrections++;
          correctedThisTurn = true;
        }
      }
      if (e.check) {
        f.runs[e.check]++;
        if (f.edits > 0 && !f.checkedAfterEdit) {
          f.checkedAfterEdit = true;
          f.editsBeforeFirstCheck = f.edits;
        }
        if (failedPending && editSinceFail)
          f.fixLoops++;
        if (e.ok !== void 0) {
          f.runsWithOutcome++;
          f.lastOutcome = e.ok;
          if (!e.ok) {
            f.failing++;
            failedPending = true;
            editSinceFail = false;
            if (firstFailIdx < 0) {
              firstFailIdx = idx;
              firstFailT = e.t;
            }
          } else {
            if (firstFailIdx >= 0 && f.redToGreenMin === null && firstFailT !== null && e.t !== null && e.t >= firstFailT) {
              f.redToGreenMin = (e.t - firstFailT) / 60;
            }
            failedPending = false;
            editSinceFail = false;
          }
        } else if (failedPending && editSinceFail) {
          failedPending = false;
          editSinceFail = false;
        }
      }
    }
  });
  return f;
}
var AGENT_KEY = { "claude-code": "claudeCode", cursor: "cursor", codex: "codex" };
function enumRecord(order, counts) {
  const out = {};
  for (const k of order) {
    const n = counts.get(k) ?? 0;
    if (n > 0)
      out[k] = n;
  }
  return out;
}
function analyseSessions(traces) {
  const used = traces.filter((t) => t.events.some((e) => e.type === "action"));
  const facts = used.map(factsOf);
  const agents = { claudeCode: 0, cursor: 0, codex: 0 };
  const models = /* @__PURE__ */ new Map();
  for (const t of used) {
    agents[AGENT_KEY[t.agent]]++;
    for (const m of new Set(t.models))
      if (MODEL_FAMILIES.includes(m))
        models.set(m, (models.get(m) ?? 0) + 1);
  }
  const mcp = /* @__PURE__ */ new Map();
  for (const f of facts)
    for (const [k, v] of f.mcp)
      mcp.set(k, (mcp.get(k) ?? 0) + v);
  const withEdits = facts.filter((f) => f.edits > 0);
  const timed = facts.filter((f) => f.minutes !== null);
  const sum = (xs) => xs.reduce((a, b) => a + b, 0);
  const failingSessions = facts.filter((f) => f.failing > 0);
  const red = facts.filter((f) => f.redToGreenMin !== null);
  const firstCheck = withEdits.filter((f) => f.editsBeforeFirstCheck !== null);
  return {
    version: 1,
    sessions: used.length,
    agents,
    activeDays: new Set(facts.map((f) => f.day).filter(Boolean)).size,
    depth: {
      minutes: spread(timed.map((f) => f.minutes)),
      toolCalls: spread(facts.map((f) => f.toolCalls)),
      turns: spread(facts.map((f) => f.turns)),
      timedSessions: timed.length
    },
    planning: {
      sessionsWithEdits: withEdits.length,
      exploreFirst: withEdits.filter((f) => f.exploreFirst).length,
      exploreBeforeEditP50: median(withEdits.map((f) => f.exploreBeforeEdit ?? 0)),
      planToolSessions: facts.filter((f) => f.usedPlanTool).length,
      editsBeforeFirstCheckP50: median(firstCheck.map((f) => f.editsBeforeFirstCheck)),
      editsBeforeFirstCheckSessions: firstCheck.length
    },
    steering: {
      prompts: sum(facts.map((f) => f.prompts)),
      corrections: sum(facts.map((f) => f.corrections)),
      interrupts: sum(facts.map((f) => f.interrupts)),
      denials: sum(facts.map((f) => f.denials)),
      userModifiedEdits: sum(facts.map((f) => f.userModified)),
      sessionsWithSteering: facts.filter((f) => f.corrections + f.interrupts + f.denials + f.userModified > 0).length
    },
    edits: {
      total: sum(facts.map((f) => f.edits)),
      undone: sum(facts.map((f) => f.undone)),
      reworked: sum(facts.map((f) => f.reworked))
    },
    verification: {
      sessionsChecking: withEdits.filter((f) => f.checkedAfterEdit).length,
      runs: {
        test: sum(facts.map((f) => f.runs.test)),
        build: sum(facts.map((f) => f.runs.build)),
        lint: sum(facts.map((f) => f.runs.lint))
      },
      runsWithOutcome: sum(facts.map((f) => f.runsWithOutcome)),
      failingRuns: sum(facts.map((f) => f.failing)),
      fixLoops: sum(facts.map((f) => f.fixLoops)),
      sessionsWithFixLoop: facts.filter((f) => f.fixLoops > 0).length,
      redToGreenMinutesP50: median(red.map((f) => f.redToGreenMin)),
      redToGreenSessions: red.length
    },
    recovery: {
      sessionsWithFailures: failingSessions.length,
      endedGreen: failingSessions.filter((f) => f.lastOutcome === true).length,
      endedRed: failingSessions.filter((f) => f.lastOutcome === false).length
    },
    subagents: { sessionsUsing: facts.filter((f) => f.subagentCalls > 0).length, calls: sum(facts.map((f) => f.subagentCalls)) },
    models: enumRecord(MODEL_FAMILIES, models),
    mcp: enumRecord(MCP_CATEGORIES, mcp)
  };
}

// packages/shared/dist/demo.js
function prng(seed) {
  let a = seed >>> 0;
  return () => {
    a = a + 1831565813 >>> 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
var DEMO_MIX = [
  { language: "TypeScript", framework: "React", weight: 0.46 },
  { language: "Python", weight: 0.22 },
  { language: "Rust", weight: 0.16 },
  { language: "Go", weight: 0.1 },
  { language: "SQL", weight: 0.06 }
];
var DEMO_NOW = 1793491200;
function demoScanInput(seed = 42, now = DEMO_NOW) {
  const rand = prng(seed);
  const pick = () => {
    let r = rand();
    for (const m of DEMO_MIX) {
      if ((r -= m.weight) <= 0)
        return m;
    }
    return DEMO_MIX[0];
  };
  const commits = [];
  for (let day = 3 * 365; day >= 0; day--) {
    if (rand() < (day > 180 ? 0.75 : 0.28))
      continue;
    const perDay = 1 + Math.floor(rand() * 4);
    for (let k = 0; k < perDay; k++) {
      const ts = now - day * 86400 + Math.floor(rand() * 5e4);
      const nFiles = rand() < 0.25 ? 3 + Math.floor(rand() * 6) : 1 + Math.floor(rand() * 2);
      const isRefactor2 = nFiles >= 3 && rand() < 0.6;
      const files = [];
      for (let f = 0; f < nFiles; f++) {
        const m = pick();
        const added2 = 5 + Math.floor(rand() * 90);
        const isTest = rand() < 0.24;
        const file = {
          language: m.language,
          added: added2,
          deleted: isRefactor2 ? Math.floor(added2 * (0.4 + rand() * 0.6)) : Math.floor(rand() * added2 * 0.2),
          isTest,
          depth: 1 + Math.floor(rand() * 5)
        };
        if (m.framework)
          file.framework = m.framework;
        files.push(file);
      }
      const added = files.reduce((s, f) => s + f.added, 0);
      const aiAssisted = rand() < 0.62;
      const churnedLines24h = aiAssisted && rand() < 0.18 ? Math.floor(added * (0.2 + rand() * 0.5)) : rand() < 0.05 ? Math.floor(added * 0.3) : 0;
      commits.push({ timestamp: ts, isRevert: rand() < 0.015, aiAssisted, churnedLines24h, files });
    }
  }
  return {
    commits,
    reposAnalyzed: 4,
    now,
    sessionAnalysis: demoSessionAnalysis(seed, now),
    ai: {
      claudeCode: { detected: true, sessions: 214, toolCalls: 214 * 23, editToolCalls: 214 * 8, prompts: 214 * 6 },
      cursor: { detected: true, sessions: 131, suggestionsShown: 18400, suggestionsAccepted: 6900 },
      codex: { detected: true, sessions: 38, toolCalls: 38 * 14 }
    }
  };
}
function demoSessionAnalysis(seed = 42, now = DEMO_NOW) {
  const rand = prng(seed ^ 24149);
  const traces = [];
  const plan = [
    ["claude-code", 60, ["claude-opus", "claude-sonnet"]],
    ["cursor", 40, ["cursor", "claude-sonnet"]],
    ["codex", 20, ["gpt-5"]]
  ];
  for (const [agent, n, fams] of plan) {
    for (let i = 0; i < n; i++) {
      let t = now - Math.floor(rand() * 90) * 86400 - Math.floor(rand() * 4e4);
      const events = [];
      const tick = (sec) => t += Math.max(5, Math.floor(sec * (0.5 + rand())));
      const turns = 1 + Math.floor(rand() * 5);
      let target = 0;
      for (let turn = 0; turn < turns; turn++) {
        events.push({ type: "prompt", t: tick(60) });
        const explores = turn === 0 ? rand() < 0.7 ? 3 + Math.floor(rand() * 6) : Math.floor(rand() * 2) : Math.floor(rand() * 3);
        for (let k = 0; k < explores; k++)
          events.push({ type: "action", t: tick(8), kind: "explore" });
        if (turn === 0 && rand() < 0.25)
          events.push({ type: "action", t: tick(10), kind: "plan" });
        if (rand() < 0.15)
          events.push({ type: "action", t: tick(40), kind: "subagent" });
        if (rand() < 0.2)
          events.push({ type: "action", t: tick(6), kind: "mcp", mcp: rand() < 0.5 ? "docs" : "browser" });
        const edits = rand() < 0.85 ? 1 + Math.floor(rand() * 5) : 0;
        for (let k = 0; k < edits; k++) {
          const sameFile = turn > 0 && k === 0 && rand() < 0.3;
          events.push({ type: "action", t: tick(25), kind: "edit", target: sameFile ? Math.max(1, target) : ++target, ...rand() < 0.04 ? { userModified: true } : {} });
        }
        if (edits > 0 && rand() < 0.1)
          events.push({ type: "action", t: tick(20), kind: "edit", target, reverts: true });
        if (rand() < 0.08)
          events.push({ type: "interrupt", t: tick(5) });
        if (edits > 0 && rand() < 0.75) {
          const check = rand() < 0.7 ? "test" : rand() < 0.6 ? "build" : "lint";
          const fails = rand() < 0.35;
          events.push({ type: "action", t: tick(45), kind: "shell", check, ok: !fails });
          if (fails && rand() < 0.85) {
            events.push({ type: "action", t: tick(30), kind: "edit", target: Math.max(1, target) });
            events.push({ type: "action", t: tick(45), kind: "shell", check, ok: rand() < 0.85 });
          }
        }
        if (rand() < 0.05)
          events.push({ type: "action", t: tick(5), kind: "shell", denied: true });
      }
      traces.push({ agent, events, models: [fams[Math.floor(rand() * fams.length)]] });
    }
  }
  return analyseSessions(traces);
}
var DEMO_MACHINE_FINGERPRINT = "7bc532f42ffd0a6b5a9560a2a0619a543eac7cb4d145d57b07392c21a7444429";

// packages/shared/dist/trust.js
var SCAN_COOLDOWN_HOURS = 20;

// packages/shared/dist/benchmark-data.js
var BENCHMARK = [[737, 656, "systems", "Cursor"], [799, 771, "python-ai", "Hybrid"], [900, 880, "typescript-nextjs", "Cursor"], [754, 713, "mobile", "Codex"], [810, 793, "mobile", "Git-Only"], [837, 831, "mobile", "Cursor"], [589, 593, "typescript-nextjs", "Git-Only"], [674, 554, "python-ai", "Hybrid"], [752, 744, "systems", "Codex"], [633, 672, "python-ai", "Codex"], [594, 598, "mobile", "Claude Code"], [838, 788, "typescript-nextjs", "Cursor"], [793, 793, "python-ai", "Git-Only"], [604, 597, "typescript-nextjs", "Claude Code"], [558, 483, "mobile", "Claude Code"], [581, 664, "python-ai", "Hybrid"], [707, 668, "typescript-nextjs", "Hybrid"], [883, 877, "systems", "Claude Code"], [747, 673, "systems", "Claude Code"], [822, 856, "systems", "Cursor"], [860, 819, "typescript-nextjs", "Hybrid"], [660, 599, "systems", "Claude Code"], [623, 453, "mobile", "Cursor"], [821, 743, "typescript-nextjs", "Hybrid"], [704, 673, "typescript-nextjs", "Hybrid"], [826, 783, "mobile", "Claude Code"], [877, 862, "python-ai", "Claude Code"], [811, 785, "systems", "Claude Code"], [642, 577, "other", "Claude Code"], [675, 663, "python-ai", "Cursor"], [601, 644, "python-ai", "Claude Code"], [796, 785, "systems", "Git-Only"], [863, 843, "systems", "Hybrid"], [865, 849, "systems", "Claude Code"], [672, 589, "systems", "Claude Code"], [776, 816, "python-ai", "Claude Code"], [780, 696, "typescript-nextjs", "Claude Code"], [805, 780, "typescript-nextjs", "Cursor"], [669, 582, "typescript-nextjs", "Claude Code"], [714, 702, "typescript-nextjs", "Git-Only"], [627, 577, "mobile", "Cursor"], [839, 744, "systems", "Cursor"], [568, 504, "python-ai", "Claude Code"], [780, 850, "systems", "Claude Code"], [884, 882, "systems", "Claude Code"], [891, 833, "python-ai", "Hybrid"], [821, 829, "python-ai", "Cursor"], [859, 903, "typescript-nextjs", "Cursor"], [744, 738, "systems", "Claude Code"], [732, 725, "mobile", "Claude Code"], [771, 778, "systems", "Cursor"], [778, 696, "typescript-nextjs", "Cursor"], [806, 806, "python-ai", "Claude Code"], [550, 421, "typescript-nextjs", "Cursor"], [927, 894, "systems", "Claude Code"], [657, 569, "typescript-nextjs", "Claude Code"], [661, 664, "python-ai", "Claude Code"], [502, 505, "python-ai", "Git-Only"], [837, 848, "typescript-nextjs", "Claude Code"], [850, 792, "python-ai", "Hybrid"], [765, 728, "mobile", "Claude Code"], [509, 467, "python-ai", "Git-Only"], [819, 796, "python-ai", "Cursor"], [672, 681, "python-ai", "Cursor"], [648, 750, "systems", "Codex"], [865, 831, "typescript-nextjs", "Claude Code"], [627, 621, "mobile", "Git-Only"], [646, 629, "typescript-nextjs", "Claude Code"], [774, 708, "python-ai", "Cursor"], [914, 826, "systems", "Claude Code"], [817, 741, "systems", "Claude Code"], [805, 762, "python-ai", "Codex"], [627, 564, "systems", "Claude Code"], [599, 522, "python-ai", "Git-Only"], [936, 874, "systems", "Claude Code"], [739, 769, "python-ai", "Hybrid"], [705, 711, "systems", "Cursor"], [828, 756, "typescript-nextjs", "Cursor"], [752, 711, "typescript-nextjs", "Claude Code"], [811, 738, "typescript-nextjs", "Claude Code"], [629, 553, "systems", "Claude Code"], [767, 712, "python-ai", "Cursor"], [935, 890, "typescript-nextjs", "Codex"], [744, 751, "systems", "Claude Code"], [749, 743, "python-ai", "Cursor"], [765, 700, "typescript-nextjs", "Codex"], [823, 793, "mobile", "Hybrid"], [693, 583, "typescript-nextjs", "Claude Code"], [806, 781, "systems", "Claude Code"], [817, 840, "systems", "Claude Code"], [860, 802, "typescript-nextjs", "Cursor"], [536, 491, "python-ai", "Git-Only"], [707, 593, "systems", "Hybrid"], [868, 854, "systems", "Cursor"], [872, 822, "python-ai", "Claude Code"], [888, 882, "typescript-nextjs", "Claude Code"], [575, 492, "systems", "Git-Only"], [747, 690, "typescript-nextjs", "Claude Code"], [872, 817, "python-ai", "Cursor"], [862, 818, "systems", "Cursor"], [760, 732, "mobile", "Cursor"], [810, 771, "typescript-nextjs", "Claude Code"], [616, 554, "mobile", "Cursor"], [648, 659, "typescript-nextjs", "Git-Only"], [754, 675, "typescript-nextjs", "Claude Code"], [828, 782, "python-ai", "Cursor"], [714, 680, "python-ai", "Git-Only"], [719, 682, "typescript-nextjs", "Hybrid"], [886, 837, "systems", "Claude Code"], [700, 683, "python-ai", "Cursor"], [538, 453, "python-ai", "Git-Only"], [765, 665, "python-ai", "Hybrid"], [792, 764, "python-ai", "Claude Code"], [757, 714, "systems", "Git-Only"], [744, 708, "python-ai", "Cursor"], [552, 624, "mobile", "Cursor"], [667, 650, "typescript-nextjs", "Claude Code"], [807, 822, "systems", "Claude Code"], [691, 756, "typescript-nextjs", "Claude Code"], [840, 790, "typescript-nextjs", "Cursor"], [872, 838, "typescript-nextjs", "Claude Code"], [891, 894, "python-ai", "Codex"], [733, 667, "python-ai", "Claude Code"], [865, 896, "typescript-nextjs", "Hybrid"], [804, 798, "python-ai", "Cursor"], [687, 713, "python-ai", "Cursor"], [640, 623, "systems", "Claude Code"], [507, 432, "python-ai", "Claude Code"], [817, 788, "systems", "Claude Code"], [726, 692, "mobile", "Hybrid"], [753, 776, "python-ai", "Claude Code"], [807, 864, "mobile", "Claude Code"], [829, 800, "systems", "Git-Only"], [601, 561, "typescript-nextjs", "Git-Only"], [703, 659, "typescript-nextjs", "Cursor"], [804, 774, "typescript-nextjs", "Cursor"], [684, 668, "systems", "Claude Code"], [521, 493, "python-ai", "Codex"], [794, 761, "typescript-nextjs", "Hybrid"], [819, 720, "mobile", "Cursor"], [776, 773, "systems", "Claude Code"], [791, 770, "systems", "Claude Code"], [794, 666, "typescript-nextjs", "Cursor"], [827, 823, "systems", "Claude Code"], [654, 705, "typescript-nextjs", "Cursor"], [551, 541, "typescript-nextjs", "Claude Code"], [598, 578, "typescript-nextjs", "Cursor"], [607, 619, "typescript-nextjs", "Claude Code"], [631, 531, "typescript-nextjs", "Cursor"], [674, 637, "python-ai", "Cursor"], [690, 629, "mobile", "Claude Code"], [853, 819, "systems", "Hybrid"], [690, 662, "python-ai", "Cursor"], [747, 744, "typescript-nextjs", "Claude Code"], [899, 877, "typescript-nextjs", "Claude Code"], [902, 845, "typescript-nextjs", "Claude Code"], [622, 672, "systems", "Git-Only"], [854, 772, "typescript-nextjs", "Cursor"], [816, 761, "typescript-nextjs", "Git-Only"], [754, 722, "python-ai", "Claude Code"], [605, 679, "typescript-nextjs", "Claude Code"], [576, 623, "python-ai", "Git-Only"], [686, 733, "typescript-nextjs", "Cursor"], [611, 590, "typescript-nextjs", "Hybrid"], [860, 808, "mobile", "Cursor"], [728, 781, "systems", "Claude Code"], [721, 608, "typescript-nextjs", "Claude Code"], [688, 636, "python-ai", "Claude Code"], [841, 773, "typescript-nextjs", "Claude Code"], [810, 762, "mobile", "Cursor"], [872, 889, "systems", "Claude Code"], [777, 723, "systems", "Cursor"], [603, 621, "systems", "Claude Code"], [822, 828, "systems", "Hybrid"], [570, 578, "python-ai", "Git-Only"], [753, 693, "python-ai", "Git-Only"], [676, 675, "python-ai", "Hybrid"], [757, 740, "python-ai", "Git-Only"], [705, 687, "python-ai", "Claude Code"], [774, 672, "systems", "Cursor"], [768, 773, "systems", "Claude Code"], [673, 603, "typescript-nextjs", "Cursor"], [615, 616, "mobile", "Codex"], [766, 775, "systems", "Hybrid"], [610, 629, "other", "Cursor"], [764, 741, "systems", "Cursor"], [514, 496, "python-ai", "Git-Only"], [824, 814, "systems", "Cursor"], [737, 718, "mobile", "Cursor"], [538, 560, "systems", "Git-Only"], [623, 583, "systems", "Git-Only"], [809, 751, "python-ai", "Claude Code"], [735, 722, "typescript-nextjs", "Cursor"], [645, 655, "typescript-nextjs", "Claude Code"], [813, 734, "mobile", "Hybrid"], [758, 756, "python-ai", "Claude Code"], [649, 618, "systems", "Codex"], [862, 870, "systems", "Claude Code"], [900, 874, "python-ai", "Cursor"], [682, 750, "typescript-nextjs", "Cursor"], [785, 771, "python-ai", "Hybrid"], [673, 682, "typescript-nextjs", "Hybrid"], [694, 678, "python-ai", "Cursor"], [671, 686, "mobile", "Claude Code"], [837, 793, "typescript-nextjs", "Claude Code"], [688, 625, "python-ai", "Git-Only"], [559, 541, "typescript-nextjs", "Cursor"], [667, 673, "python-ai", "Git-Only"], [713, 745, "typescript-nextjs", "Cursor"], [867, 833, "python-ai", "Codex"], [640, 691, "typescript-nextjs", "Hybrid"], [742, 713, "python-ai", "Claude Code"], [573, 520, "python-ai", "Cursor"], [629, 659, "python-ai", "Claude Code"], [896, 835, "typescript-nextjs", "Cursor"], [795, 755, "mobile", "Claude Code"], [688, 626, "python-ai", "Git-Only"], [575, 483, "python-ai", "Cursor"], [673, 713, "systems", "Cursor"], [763, 756, "python-ai", "Git-Only"], [835, 837, "systems", "Cursor"], [661, 554, "python-ai", "Claude Code"], [841, 817, "typescript-nextjs", "Cursor"], [842, 821, "typescript-nextjs", "Claude Code"], [652, 659, "typescript-nextjs", "Codex"], [795, 748, "systems", "Cursor"], [824, 738, "typescript-nextjs", "Git-Only"], [779, 795, "systems", "Codex"], [836, 817, "systems", "Cursor"], [815, 822, "typescript-nextjs", "Cursor"], [686, 620, "systems", "Git-Only"], [608, 598, "typescript-nextjs", "Cursor"], [664, 663, "python-ai", "Cursor"], [858, 816, "python-ai", "Cursor"], [762, 774, "systems", "Git-Only"], [788, 730, "python-ai", "Claude Code"], [648, 525, "python-ai", "Codex"], [718, 664, "mobile", "Hybrid"], [618, 518, "python-ai", "Claude Code"], [816, 837, "systems", "Claude Code"], [892, 872, "typescript-nextjs", "Hybrid"], [795, 687, "python-ai", "Claude Code"], [892, 835, "systems", "Hybrid"], [861, 809, "typescript-nextjs", "Hybrid"], [662, 604, "systems", "Cursor"], [883, 874, "typescript-nextjs", "Claude Code"], [841, 787, "python-ai", "Cursor"], [718, 663, "typescript-nextjs", "Claude Code"], [787, 648, "python-ai", "Cursor"], [737, 798, "python-ai", "Hybrid"], [722, 663, "python-ai", "Claude Code"], [610, 608, "systems", "Claude Code"], [633, 677, "systems", "Claude Code"], [657, 655, "typescript-nextjs", "Claude Code"], [685, 629, "typescript-nextjs", "Claude Code"], [654, 636, "typescript-nextjs", "Cursor"], [831, 800, "typescript-nextjs", "Claude Code"], [813, 780, "typescript-nextjs", "Hybrid"], [911, 910, "systems", "Codex"], [816, 811, "python-ai", "Cursor"], [881, 885, "systems", "Claude Code"], [641, 543, "typescript-nextjs", "Claude Code"], [788, 778, "python-ai", "Hybrid"], [600, 525, "python-ai", "Claude Code"], [728, 678, "systems", "Hybrid"], [752, 715, "typescript-nextjs", "Claude Code"], [590, 599, "mobile", "Hybrid"], [787, 764, "systems", "Cursor"], [896, 870, "python-ai", "Cursor"], [530, 518, "typescript-nextjs", "Git-Only"], [787, 780, "mobile", "Claude Code"], [761, 665, "mobile", "Git-Only"], [835, 891, "systems", "Cursor"], [822, 785, "typescript-nextjs", "Cursor"], [646, 602, "python-ai", "Cursor"], [860, 846, "systems", "Cursor"], [789, 731, "python-ai", "Git-Only"], [786, 788, "typescript-nextjs", "Cursor"], [843, 800, "python-ai", "Claude Code"], [871, 829, "mobile", "Cursor"], [782, 788, "mobile", "Hybrid"], [888, 887, "systems", "Claude Code"], [833, 815, "mobile", "Hybrid"], [668, 710, "python-ai", "Claude Code"], [679, 592, "python-ai", "Git-Only"], [709, 720, "typescript-nextjs", "Hybrid"], [868, 849, "mobile", "Claude Code"], [821, 783, "python-ai", "Cursor"], [748, 675, "typescript-nextjs", "Claude Code"], [532, 514, "typescript-nextjs", "Git-Only"], [831, 768, "python-ai", "Claude Code"], [774, 757, "typescript-nextjs", "Cursor"], [832, 777, "systems", "Claude Code"], [599, 578, "typescript-nextjs", "Claude Code"], [765, 697, "typescript-nextjs", "Git-Only"], [753, 757, "typescript-nextjs", "Cursor"], [633, 541, "typescript-nextjs", "Hybrid"], [622, 627, "typescript-nextjs", "Hybrid"], [616, 602, "typescript-nextjs", "Claude Code"], [591, 648, "python-ai", "Hybrid"], [702, 633, "python-ai", "Git-Only"], [655, 652, "systems", "Claude Code"], [656, 609, "other", "Hybrid"], [863, 874, "typescript-nextjs", "Claude Code"], [606, 590, "mobile", "Git-Only"], [811, 821, "typescript-nextjs", "Claude Code"], [845, 854, "mobile", "Hybrid"], [806, 793, "typescript-nextjs", "Claude Code"], [557, 547, "typescript-nextjs", "Cursor"], [698, 598, "typescript-nextjs", "Claude Code"], [797, 854, "systems", "Claude Code"], [901, 863, "systems", "Cursor"], [837, 814, "mobile", "Cursor"], [817, 671, "python-ai", "Codex"], [582, 564, "python-ai", "Hybrid"], [635, 596, "typescript-nextjs", "Claude Code"], [711, 682, "python-ai", "Claude Code"], [663, 628, "mobile", "Codex"], [703, 622, "python-ai", "Claude Code"], [823, 691, "systems", "Cursor"], [893, 924, "systems", "Hybrid"], [644, 681, "python-ai", "Cursor"], [552, 460, "typescript-nextjs", "Codex"], [816, 783, "typescript-nextjs", "Claude Code"], [848, 827, "typescript-nextjs", "Claude Code"], [755, 691, "python-ai", "Cursor"], [899, 859, "systems", "Claude Code"], [843, 817, "typescript-nextjs", "Hybrid"], [757, 696, "systems", "Claude Code"], [726, 632, "typescript-nextjs", "Claude Code"], [684, 681, "typescript-nextjs", "Claude Code"], [934, 894, "systems", "Cursor"], [752, 750, "typescript-nextjs", "Claude Code"], [686, 694, "typescript-nextjs", "Cursor"], [914, 905, "typescript-nextjs", "Hybrid"], [865, 834, "python-ai", "Claude Code"], [806, 773, "systems", "Hybrid"], [789, 707, "systems", "Git-Only"], [771, 787, "python-ai", "Cursor"], [693, 757, "mobile", "Cursor"], [642, 684, "python-ai", "Hybrid"], [634, 580, "systems", "Git-Only"], [705, 676, "python-ai", "Cursor"], [830, 859, "systems", "Claude Code"], [799, 778, "python-ai", "Hybrid"], [711, 629, "python-ai", "Git-Only"], [796, 767, "typescript-nextjs", "Codex"], [771, 612, "typescript-nextjs", "Hybrid"], [854, 833, "typescript-nextjs", "Claude Code"], [872, 791, "typescript-nextjs", "Cursor"], [649, 656, "typescript-nextjs", "Hybrid"], [887, 815, "systems", "Codex"], [595, 658, "python-ai", "Cursor"], [547, 528, "mobile", "Git-Only"], [634, 658, "typescript-nextjs", "Claude Code"], [748, 741, "mobile", "Claude Code"], [611, 572, "python-ai", "Cursor"], [581, 661, "typescript-nextjs", "Claude Code"], [622, 669, "typescript-nextjs", "Claude Code"], [736, 630, "typescript-nextjs", "Claude Code"], [829, 814, "python-ai", "Claude Code"], [725, 624, "typescript-nextjs", "Cursor"], [776, 697, "typescript-nextjs", "Claude Code"], [700, 603, "typescript-nextjs", "Claude Code"], [637, 605, "typescript-nextjs", "Hybrid"], [870, 820, "typescript-nextjs", "Claude Code"], [780, 767, "python-ai", "Git-Only"], [897, 896, "systems", "Claude Code"], [579, 614, "python-ai", "Hybrid"], [930, 897, "systems", "Claude Code"], [836, 872, "typescript-nextjs", "Codex"], [585, 544, "typescript-nextjs", "Git-Only"], [880, 839, "typescript-nextjs", "Hybrid"], [578, 692, "systems", "Git-Only"], [805, 820, "python-ai", "Cursor"], [855, 883, "typescript-nextjs", "Claude Code"], [858, 814, "python-ai", "Hybrid"], [811, 814, "systems", "Git-Only"], [769, 771, "typescript-nextjs", "Git-Only"], [637, 602, "typescript-nextjs", "Git-Only"], [866, 797, "typescript-nextjs", "Cursor"], [693, 680, "systems", "Cursor"], [907, 863, "typescript-nextjs", "Claude Code"], [811, 742, "mobile", "Cursor"], [687, 676, "mobile", "Git-Only"], [732, 765, "systems", "Claude Code"], [556, 559, "typescript-nextjs", "Claude Code"], [848, 845, "typescript-nextjs", "Cursor"], [830, 807, "typescript-nextjs", "Cursor"], [747, 687, "python-ai", "Cursor"], [777, 809, "mobile", "Claude Code"], [827, 711, "typescript-nextjs", "Claude Code"], [584, 582, "python-ai", "Claude Code"], [691, 633, "systems", "Git-Only"], [775, 771, "mobile", "Claude Code"], [838, 809, "typescript-nextjs", "Claude Code"], [834, 793, "systems", "Hybrid"], [770, 791, "systems", "Hybrid"], [566, 549, "python-ai", "Cursor"], [796, 776, "typescript-nextjs", "Claude Code"], [575, 583, "typescript-nextjs", "Hybrid"], [879, 856, "systems", "Claude Code"], [822, 792, "python-ai", "Git-Only"], [829, 824, "systems", "Git-Only"], [905, 866, "typescript-nextjs", "Cursor"], [647, 629, "systems", "Claude Code"], [718, 596, "systems", "Hybrid"], [797, 812, "python-ai", "Cursor"], [637, 672, "python-ai", "Cursor"], [781, 751, "typescript-nextjs", "Claude Code"], [834, 799, "systems", "Hybrid"], [854, 801, "typescript-nextjs", "Hybrid"], [782, 782, "python-ai", "Claude Code"], [786, 796, "mobile", "Claude Code"], [559, 535, "python-ai", "Cursor"], [746, 624, "systems", "Hybrid"], [852, 829, "systems", "Git-Only"], [728, 685, "typescript-nextjs", "Git-Only"], [875, 854, "python-ai", "Cursor"], [685, 677, "systems", "Claude Code"], [737, 772, "mobile", "Claude Code"], [710, 636, "python-ai", "Claude Code"], [704, 614, "mobile", "Cursor"], [756, 773, "mobile", "Hybrid"], [824, 813, "python-ai", "Hybrid"], [863, 852, "typescript-nextjs", "Hybrid"], [618, 518, "mobile", "Codex"], [707, 730, "mobile", "Cursor"], [759, 670, "python-ai", "Claude Code"], [819, 842, "mobile", "Hybrid"], [828, 780, "typescript-nextjs", "Claude Code"], [707, 625, "mobile", "Claude Code"], [766, 726, "typescript-nextjs", "Cursor"], [868, 809, "python-ai", "Claude Code"], [778, 773, "systems", "Git-Only"], [782, 737, "typescript-nextjs", "Git-Only"], [610, 619, "systems", "Cursor"], [734, 674, "typescript-nextjs", "Claude Code"], [897, 894, "systems", "Cursor"], [743, 671, "typescript-nextjs", "Cursor"], [804, 774, "typescript-nextjs", "Cursor"], [863, 867, "typescript-nextjs", "Claude Code"], [641, 629, "python-ai", "Claude Code"], [623, 599, "mobile", "Codex"], [788, 688, "python-ai", "Cursor"], [876, 867, "typescript-nextjs", "Hybrid"], [716, 716, "mobile", "Hybrid"], [798, 647, "typescript-nextjs", "Cursor"], [820, 860, "mobile", "Claude Code"], [808, 820, "typescript-nextjs", "Claude Code"], [787, 729, "typescript-nextjs", "Claude Code"], [812, 799, "typescript-nextjs", "Claude Code"], [789, 752, "systems", "Claude Code"], [896, 904, "python-ai", "Claude Code"], [825, 777, "mobile", "Cursor"], [677, 709, "python-ai", "Claude Code"], [894, 851, "systems", "Cursor"], [658, 690, "systems", "Cursor"], [762, 764, "systems", "Git-Only"], [814, 821, "typescript-nextjs", "Cursor"], [701, 702, "python-ai", "Cursor"], [739, 732, "python-ai", "Cursor"], [725, 684, "systems", "Git-Only"], [676, 664, "typescript-nextjs", "Hybrid"], [694, 676, "typescript-nextjs", "Claude Code"], [719, 696, "python-ai", "Cursor"], [755, 773, "python-ai", "Git-Only"], [544, 543, "mobile", "Git-Only"], [790, 732, "systems", "Cursor"], [850, 834, "python-ai", "Claude Code"], [702, 616, "systems", "Hybrid"], [812, 779, "python-ai", "Cursor"], [556, 612, "systems", "Git-Only"], [652, 623, "typescript-nextjs", "Cursor"], [830, 842, "typescript-nextjs", "Hybrid"], [790, 779, "python-ai", "Hybrid"], [687, 727, "systems", "Git-Only"], [823, 823, "typescript-nextjs", "Claude Code"], [761, 689, "python-ai", "Claude Code"], [559, 631, "systems", "Git-Only"], [878, 892, "typescript-nextjs", "Cursor"], [602, 558, "systems", "Claude Code"], [832, 829, "typescript-nextjs", "Git-Only"], [756, 754, "python-ai", "Claude Code"], [925, 933, "typescript-nextjs", "Claude Code"], [892, 881, "mobile", "Codex"], [536, 570, "systems", "Claude Code"], [826, 783, "mobile", "Cursor"], [693, 645, "python-ai", "Codex"], [873, 855, "typescript-nextjs", "Claude Code"], [863, 820, "systems", "Cursor"], [820, 792, "python-ai", "Git-Only"], [808, 826, "systems", "Hybrid"], [768, 713, "typescript-nextjs", "Cursor"], [700, 692, "systems", "Git-Only"], [737, 763, "python-ai", "Git-Only"], [906, 885, "typescript-nextjs", "Claude Code"], [613, 599, "systems", "Claude Code"], [602, 555, "systems", "Cursor"], [753, 647, "typescript-nextjs", "Cursor"], [833, 827, "systems", "Cursor"], [748, 689, "mobile", "Claude Code"], [723, 671, "python-ai", "Cursor"], [825, 834, "python-ai", "Hybrid"], [867, 835, "typescript-nextjs", "Cursor"], [606, 671, "python-ai", "Claude Code"], [691, 639, "python-ai", "Claude Code"], [738, 724, "typescript-nextjs", "Claude Code"], [715, 678, "python-ai", "Git-Only"], [608, 571, "mobile", "Codex"], [708, 714, "mobile", "Cursor"], [867, 828, "typescript-nextjs", "Claude Code"], [640, 618, "systems", "Cursor"], [809, 793, "typescript-nextjs", "Claude Code"], [732, 714, "typescript-nextjs", "Claude Code"], [801, 807, "python-ai", "Cursor"], [866, 819, "python-ai", "Cursor"], [908, 906, "systems", "Claude Code"], [755, 698, "typescript-nextjs", "Claude Code"], [591, 550, "typescript-nextjs", "Claude Code"], [768, 786, "python-ai", "Claude Code"], [669, 738, "typescript-nextjs", "Cursor"], [809, 798, "typescript-nextjs", "Cursor"], [818, 807, "mobile", "Cursor"], [774, 795, "python-ai", "Cursor"], [612, 536, "python-ai", "Claude Code"], [595, 530, "python-ai", "Codex"], [848, 803, "systems", "Claude Code"], [843, 811, "typescript-nextjs", "Hybrid"], [615, 704, "mobile", "Hybrid"], [845, 778, "systems", "Cursor"], [687, 677, "typescript-nextjs", "Cursor"], [731, 779, "systems", "Claude Code"], [675, 636, "systems", "Claude Code"], [720, 645, "typescript-nextjs", "Hybrid"], [755, 720, "typescript-nextjs", "Git-Only"], [707, 773, "python-ai", "Cursor"], [678, 681, "mobile", "Git-Only"], [630, 600, "systems", "Codex"], [682, 629, "typescript-nextjs", "Cursor"], [804, 754, "typescript-nextjs", "Cursor"], [520, 465, "python-ai", "Claude Code"], [794, 736, "typescript-nextjs", "Cursor"], [820, 802, "typescript-nextjs", "Cursor"], [791, 770, "mobile", "Git-Only"], [707, 695, "mobile", "Hybrid"], [885, 779, "typescript-nextjs", "Claude Code"], [850, 832, "systems", "Claude Code"], [740, 686, "typescript-nextjs", "Claude Code"], [769, 784, "typescript-nextjs", "Cursor"], [756, 770, "python-ai", "Cursor"], [511, 552, "typescript-nextjs", "Claude Code"], [703, 692, "typescript-nextjs", "Claude Code"], [848, 861, "systems", "Hybrid"], [600, 585, "python-ai", "Claude Code"], [774, 750, "systems", "Codex"], [861, 832, "python-ai", "Cursor"], [766, 738, "typescript-nextjs", "Codex"], [782, 735, "python-ai", "Claude Code"], [579, 679, "python-ai", "Hybrid"], [720, 643, "python-ai", "Claude Code"], [869, 785, "systems", "Cursor"], [631, 572, "typescript-nextjs", "Claude Code"], [650, 629, "systems", "Claude Code"], [569, 557, "typescript-nextjs", "Git-Only"], [912, 891, "typescript-nextjs", "Cursor"], [822, 759, "systems", "Codex"], [805, 755, "typescript-nextjs", "Git-Only"], [891, 827, "systems", "Cursor"], [916, 903, "python-ai", "Codex"], [740, 713, "typescript-nextjs", "Codex"], [721, 677, "mobile", "Git-Only"], [771, 769, "mobile", "Cursor"], [716, 508, "typescript-nextjs", "Hybrid"], [762, 757, "python-ai", "Claude Code"], [711, 690, "typescript-nextjs", "Claude Code"], [617, 574, "mobile", "Cursor"], [715, 686, "python-ai", "Claude Code"], [565, 486, "typescript-nextjs", "Cursor"], [703, 654, "typescript-nextjs", "Codex"], [763, 809, "systems", "Git-Only"], [561, 547, "python-ai", "Claude Code"], [681, 712, "python-ai", "Git-Only"], [705, 683, "python-ai", "Claude Code"], [651, 711, "python-ai", "Cursor"], [893, 843, "mobile", "Claude Code"], [642, 718, "mobile", "Claude Code"], [744, 701, "systems", "Hybrid"], [790, 826, "typescript-nextjs", "Claude Code"], [813, 758, "systems", "Cursor"], [663, 676, "typescript-nextjs", "Claude Code"], [672, 639, "typescript-nextjs", "Git-Only"], [541, 506, "typescript-nextjs", "Git-Only"], [505, 513, "python-ai", "Hybrid"], [728, 703, "python-ai", "Git-Only"], [854, 849, "python-ai", "Claude Code"], [695, 711, "typescript-nextjs", "Claude Code"], [807, 775, "python-ai", "Claude Code"], [607, 673, "python-ai", "Cursor"], [635, 633, "systems", "Cursor"], [614, 649, "other", "Cursor"], [848, 841, "typescript-nextjs", "Codex"], [600, 585, "typescript-nextjs", "Codex"], [691, 636, "python-ai", "Git-Only"], [627, 584, "systems", "Codex"], [759, 692, "typescript-nextjs", "Claude Code"], [907, 832, "typescript-nextjs", "Cursor"], [845, 821, "typescript-nextjs", "Git-Only"], [572, 543, "systems", "Git-Only"], [746, 738, "systems", "Claude Code"], [612, 559, "systems", "Claude Code"], [694, 629, "systems", "Claude Code"], [685, 715, "systems", "Hybrid"], [855, 787, "typescript-nextjs", "Cursor"], [736, 670, "systems", "Claude Code"], [824, 854, "systems", "Claude Code"], [579, 599, "typescript-nextjs", "Claude Code"], [695, 762, "python-ai", "Cursor"], [826, 773, "systems", "Cursor"], [780, 716, "python-ai", "Hybrid"], [832, 840, "python-ai", "Cursor"], [829, 775, "python-ai", "Claude Code"], [855, 846, "mobile", "Cursor"], [722, 627, "mobile", "Cursor"], [819, 757, "mobile", "Cursor"], [874, 848, "systems", "Hybrid"], [798, 748, "typescript-nextjs", "Git-Only"], [745, 713, "python-ai", "Claude Code"], [839, 836, "mobile", "Cursor"], [590, 624, "typescript-nextjs", "Cursor"], [699, 729, "typescript-nextjs", "Claude Code"], [662, 675, "systems", "Cursor"], [783, 827, "mobile", "Claude Code"], [821, 847, "typescript-nextjs", "Cursor"], [877, 869, "python-ai", "Codex"], [617, 634, "python-ai", "Cursor"], [584, 553, "other", "Claude Code"], [613, 618, "python-ai", "Git-Only"], [731, 730, "systems", "Claude Code"], [589, 568, "typescript-nextjs", "Codex"], [686, 708, "mobile", "Claude Code"], [872, 833, "systems", "Cursor"], [604, 539, "python-ai", "Claude Code"], [808, 763, "systems", "Claude Code"], [796, 774, "systems", "Codex"], [808, 776, "python-ai", "Git-Only"], [801, 789, "typescript-nextjs", "Cursor"], [756, 636, "typescript-nextjs", "Claude Code"], [754, 775, "mobile", "Cursor"], [713, 678, "typescript-nextjs", "Cursor"], [719, 691, "python-ai", "Git-Only"], [585, 570, "python-ai", "Cursor"], [815, 725, "systems", "Claude Code"], [863, 838, "typescript-nextjs", "Hybrid"], [639, 593, "typescript-nextjs", "Hybrid"], [659, 631, "typescript-nextjs", "Claude Code"], [707, 600, "typescript-nextjs", "Claude Code"], [601, 664, "mobile", "Claude Code"], [568, 500, "mobile", "Hybrid"], [685, 652, "systems", "Hybrid"], [698, 692, "systems", "Cursor"], [851, 841, "systems", "Claude Code"], [851, 802, "mobile", "Claude Code"], [828, 778, "typescript-nextjs", "Claude Code"], [764, 741, "python-ai", "Claude Code"], [739, 704, "python-ai", "Cursor"], [688, 665, "systems", "Claude Code"], [709, 755, "python-ai", "Hybrid"], [815, 761, "systems", "Claude Code"], [688, 603, "systems", "Cursor"], [628, 611, "typescript-nextjs", "Cursor"], [806, 758, "mobile", "Cursor"], [658, 610, "typescript-nextjs", "Claude Code"], [666, 625, "typescript-nextjs", "Cursor"], [824, 789, "systems", "Codex"], [876, 864, "systems", "Cursor"], [825, 773, "typescript-nextjs", "Codex"], [553, 591, "systems", "Hybrid"], [812, 785, "typescript-nextjs", "Cursor"], [679, 741, "typescript-nextjs", "Claude Code"], [907, 884, "systems", "Claude Code"], [796, 690, "typescript-nextjs", "Claude Code"], [846, 814, "typescript-nextjs", "Hybrid"], [804, 704, "python-ai", "Claude Code"], [943, 899, "systems", "Claude Code"], [666, 630, "python-ai", "Git-Only"], [594, 578, "typescript-nextjs", "Hybrid"], [618, 477, "python-ai", "Claude Code"], [693, 603, "systems", "Claude Code"], [737, 753, "typescript-nextjs", "Hybrid"], [815, 756, "python-ai", "Claude Code"], [692, 563, "python-ai", "Cursor"], [831, 831, "python-ai", "Claude Code"], [690, 692, "systems", "Claude Code"], [918, 887, "systems", "Claude Code"], [877, 879, "typescript-nextjs", "Claude Code"], [794, 763, "typescript-nextjs", "Claude Code"], [607, 654, "python-ai", "Cursor"], [510, 606, "python-ai", "Git-Only"], [623, 636, "typescript-nextjs", "Cursor"], [746, 682, "python-ai", "Claude Code"], [717, 661, "systems", "Claude Code"], [733, 730, "systems", "Claude Code"], [684, 746, "python-ai", "Claude Code"], [799, 776, "python-ai", "Claude Code"], [716, 693, "python-ai", "Claude Code"], [679, 674, "typescript-nextjs", "Hybrid"], [799, 809, "typescript-nextjs", "Claude Code"], [560, 532, "python-ai", "Claude Code"], [842, 796, "systems", "Claude Code"], [582, 536, "systems", "Git-Only"], [721, 703, "python-ai", "Cursor"], [632, 563, "python-ai", "Cursor"], [808, 769, "typescript-nextjs", "Hybrid"], [593, 589, "typescript-nextjs", "Git-Only"], [738, 732, "mobile", "Hybrid"], [686, 738, "typescript-nextjs", "Claude Code"], [807, 770, "typescript-nextjs", "Git-Only"], [882, 858, "typescript-nextjs", "Claude Code"], [619, 610, "mobile", "Codex"], [857, 799, "systems", "Hybrid"], [751, 701, "python-ai", "Claude Code"], [806, 784, "mobile", "Claude Code"], [780, 731, "python-ai", "Codex"], [822, 796, "typescript-nextjs", "Git-Only"], [861, 832, "python-ai", "Claude Code"], [686, 711, "typescript-nextjs", "Codex"], [636, 611, "python-ai", "Cursor"], [540, 512, "typescript-nextjs", "Hybrid"], [623, 623, "python-ai", "Codex"], [668, 639, "python-ai", "Hybrid"], [921, 861, "typescript-nextjs", "Claude Code"], [878, 881, "python-ai", "Cursor"], [835, 752, "systems", "Cursor"], [630, 592, "python-ai", "Cursor"], [896, 832, "systems", "Claude Code"], [889, 879, "mobile", "Hybrid"], [785, 750, "mobile", "Claude Code"], [891, 840, "systems", "Cursor"], [666, 729, "typescript-nextjs", "Claude Code"], [570, 532, "python-ai", "Codex"], [688, 660, "mobile", "Hybrid"], [566, 557, "systems", "Cursor"], [844, 864, "mobile", "Hybrid"], [551, 534, "python-ai", "Claude Code"], [746, 730, "systems", "Claude Code"], [886, 872, "typescript-nextjs", "Hybrid"], [779, 701, "mobile", "Claude Code"], [628, 512, "systems", "Cursor"], [844, 798, "typescript-nextjs", "Claude Code"], [607, 597, "typescript-nextjs", "Git-Only"], [802, 772, "typescript-nextjs", "Cursor"], [852, 864, "python-ai", "Codex"], [838, 705, "systems", "Claude Code"], [725, 681, "mobile", "Cursor"], [797, 792, "systems", "Cursor"], [729, 699, "typescript-nextjs", "Git-Only"], [658, 583, "typescript-nextjs", "Hybrid"], [679, 642, "systems", "Git-Only"], [767, 713, "typescript-nextjs", "Hybrid"], [711, 687, "python-ai", "Hybrid"], [714, 625, "python-ai", "Cursor"], [809, 726, "mobile", "Claude Code"], [743, 793, "systems", "Cursor"], [858, 819, "typescript-nextjs", "Cursor"], [626, 622, "typescript-nextjs", "Codex"], [661, 646, "typescript-nextjs", "Cursor"], [747, 739, "python-ai", "Claude Code"], [729, 610, "typescript-nextjs", "Git-Only"], [651, 632, "typescript-nextjs", "Cursor"], [805, 742, "python-ai", "Claude Code"], [805, 720, "typescript-nextjs", "Claude Code"], [858, 813, "systems", "Cursor"], [559, 566, "systems", "Cursor"], [792, 778, "systems", "Claude Code"], [670, 719, "typescript-nextjs", "Claude Code"], [796, 774, "python-ai", "Claude Code"], [630, 652, "other", "Git-Only"], [868, 830, "mobile", "Claude Code"], [664, 680, "mobile", "Cursor"], [589, 651, "python-ai", "Claude Code"], [750, 775, "python-ai", "Git-Only"], [704, 685, "typescript-nextjs", "Cursor"], [841, 790, "python-ai", "Claude Code"], [635, 626, "typescript-nextjs", "Hybrid"], [572, 526, "python-ai", "Git-Only"], [733, 754, "systems", "Git-Only"], [649, 607, "systems", "Cursor"], [731, 683, "python-ai", "Claude Code"], [641, 635, "python-ai", "Hybrid"], [627, 581, "systems", "Cursor"], [719, 717, "python-ai", "Git-Only"], [794, 695, "mobile", "Cursor"], [735, 695, "python-ai", "Cursor"], [856, 837, "python-ai", "Cursor"], [708, 717, "typescript-nextjs", "Cursor"], [895, 857, "typescript-nextjs", "Hybrid"], [757, 746, "systems", "Hybrid"], [904, 878, "systems", "Claude Code"], [717, 730, "python-ai", "Git-Only"], [700, 654, "typescript-nextjs", "Codex"], [520, 511, "python-ai", "Git-Only"], [615, 633, "python-ai", "Git-Only"], [808, 769, "typescript-nextjs", "Claude Code"], [598, 543, "mobile", "Claude Code"], [729, 733, "python-ai", "Git-Only"], [854, 859, "systems", "Claude Code"], [587, 548, "typescript-nextjs", "Cursor"], [872, 842, "python-ai", "Cursor"], [650, 610, "python-ai", "Claude Code"], [891, 880, "typescript-nextjs", "Hybrid"], [736, 647, "typescript-nextjs", "Cursor"], [871, 835, "python-ai", "Claude Code"], [618, 616, "python-ai", "Hybrid"], [870, 823, "systems", "Cursor"], [654, 549, "python-ai", "Claude Code"], [667, 659, "typescript-nextjs", "Git-Only"], [752, 794, "python-ai", "Claude Code"], [689, 703, "typescript-nextjs", "Cursor"], [689, 618, "mobile", "Cursor"], [669, 560, "systems", "Cursor"], [821, 812, "systems", "Claude Code"], [733, 677, "mobile", "Codex"], [768, 785, "typescript-nextjs", "Cursor"], [726, 741, "typescript-nextjs", "Codex"], [841, 837, "python-ai", "Hybrid"], [855, 812, "mobile", "Cursor"], [729, 677, "mobile", "Claude Code"], [704, 622, "mobile", "Claude Code"], [701, 690, "typescript-nextjs", "Claude Code"], [890, 844, "python-ai", "Cursor"], [788, 745, "python-ai", "Hybrid"], [824, 813, "typescript-nextjs", "Cursor"], [737, 674, "python-ai", "Claude Code"], [900, 876, "typescript-nextjs", "Claude Code"], [752, 810, "typescript-nextjs", "Codex"], [819, 804, "python-ai", "Hybrid"], [665, 651, "typescript-nextjs", "Cursor"], [650, 586, "typescript-nextjs", "Cursor"], [908, 861, "typescript-nextjs", "Claude Code"], [799, 741, "typescript-nextjs", "Cursor"], [758, 680, "python-ai", "Hybrid"], [615, 674, "typescript-nextjs", "Codex"], [777, 731, "python-ai", "Claude Code"], [738, 683, "python-ai", "Hybrid"], [841, 792, "python-ai", "Cursor"], [623, 601, "systems", "Claude Code"], [852, 773, "typescript-nextjs", "Claude Code"], [658, 626, "typescript-nextjs", "Claude Code"], [879, 864, "typescript-nextjs", "Claude Code"], [800, 784, "systems", "Cursor"], [617, 586, "python-ai", "Claude Code"], [770, 790, "systems", "Cursor"], [876, 878, "systems", "Hybrid"], [760, 735, "systems", "Hybrid"], [912, 915, "systems", "Claude Code"], [667, 598, "typescript-nextjs", "Cursor"], [632, 617, "typescript-nextjs", "Git-Only"], [786, 760, "python-ai", "Hybrid"], [529, 441, "typescript-nextjs", "Git-Only"], [684, 681, "typescript-nextjs", "Claude Code"], [762, 698, "systems", "Hybrid"], [638, 624, "python-ai", "Git-Only"], [885, 877, "mobile", "Hybrid"], [731, 733, "python-ai", "Claude Code"], [912, 836, "systems", "Hybrid"], [743, 683, "python-ai", "Git-Only"], [622, 550, "typescript-nextjs", "Git-Only"], [655, 627, "python-ai", "Git-Only"], [856, 813, "python-ai", "Hybrid"], [727, 683, "systems", "Cursor"], [840, 813, "systems", "Claude Code"], [693, 694, "typescript-nextjs", "Claude Code"], [854, 832, "systems", "Codex"], [918, 906, "typescript-nextjs", "Claude Code"], [728, 753, "typescript-nextjs", "Git-Only"], [830, 804, "python-ai", "Codex"], [933, 908, "typescript-nextjs", "Hybrid"], [734, 750, "typescript-nextjs", "Git-Only"], [809, 821, "systems", "Cursor"], [861, 831, "mobile", "Claude Code"], [798, 694, "mobile", "Git-Only"], [708, 694, "mobile", "Claude Code"], [715, 687, "typescript-nextjs", "Claude Code"], [728, 634, "python-ai", "Claude Code"], [804, 761, "typescript-nextjs", "Cursor"], [713, 717, "typescript-nextjs", "Claude Code"], [657, 599, "mobile", "Cursor"], [712, 723, "typescript-nextjs", "Hybrid"], [792, 772, "systems", "Git-Only"], [811, 791, "typescript-nextjs", "Cursor"], [820, 809, "python-ai", "Cursor"], [787, 813, "systems", "Git-Only"], [794, 812, "typescript-nextjs", "Claude Code"], [763, 759, "systems", "Cursor"], [881, 797, "typescript-nextjs", "Hybrid"], [856, 829, "systems", "Claude Code"], [728, 681, "typescript-nextjs", "Cursor"], [575, 566, "typescript-nextjs", "Cursor"], [883, 879, "systems", "Cursor"], [715, 673, "systems", "Git-Only"], [784, 771, "systems", "Git-Only"], [559, 521, "typescript-nextjs", "Cursor"], [767, 719, "python-ai", "Claude Code"], [828, 871, "systems", "Claude Code"], [742, 758, "mobile", "Hybrid"], [774, 675, "systems", "Hybrid"], [626, 567, "typescript-nextjs", "Git-Only"], [722, 707, "python-ai", "Hybrid"], [611, 593, "python-ai", "Cursor"], [813, 849, "systems", "Cursor"], [829, 817, "mobile", "Claude Code"], [610, 629, "systems", "Git-Only"], [602, 636, "python-ai", "Codex"], [875, 858, "systems", "Cursor"], [679, 659, "mobile", "Cursor"], [660, 625, "python-ai", "Hybrid"], [670, 699, "typescript-nextjs", "Claude Code"], [652, 614, "python-ai", "Git-Only"], [825, 808, "systems", "Codex"], [875, 858, "typescript-nextjs", "Cursor"], [904, 829, "typescript-nextjs", "Claude Code"], [773, 824, "systems", "Claude Code"], [829, 801, "python-ai", "Cursor"], [790, 840, "typescript-nextjs", "Claude Code"], [558, 445, "python-ai", "Hybrid"], [873, 822, "systems", "Claude Code"], [715, 662, "typescript-nextjs", "Git-Only"], [633, 647, "python-ai", "Claude Code"], [828, 832, "mobile", "Hybrid"], [706, 687, "systems", "Git-Only"], [643, 646, "typescript-nextjs", "Git-Only"], [778, 634, "systems", "Hybrid"], [817, 799, "mobile", "Cursor"], [873, 859, "systems", "Cursor"], [764, 739, "typescript-nextjs", "Cursor"], [738, 735, "systems", "Cursor"], [853, 831, "mobile", "Hybrid"], [742, 732, "systems", "Claude Code"], [568, 435, "mobile", "Cursor"], [619, 598, "typescript-nextjs", "Claude Code"], [762, 719, "systems", "Cursor"], [646, 670, "other", "Cursor"], [765, 674, "typescript-nextjs", "Claude Code"], [819, 791, "systems", "Git-Only"], [772, 777, "typescript-nextjs", "Hybrid"], [635, 617, "mobile", "Git-Only"], [657, 652, "systems", "Cursor"], [749, 787, "python-ai", "Git-Only"], [893, 891, "systems", "Cursor"], [669, 665, "python-ai", "Cursor"], [715, 709, "systems", "Claude Code"], [707, 699, "python-ai", "Git-Only"], [592, 560, "python-ai", "Cursor"], [627, 656, "python-ai", "Cursor"], [604, 585, "mobile", "Hybrid"], [638, 609, "typescript-nextjs", "Codex"], [734, 779, "typescript-nextjs", "Claude Code"], [649, 584, "typescript-nextjs", "Claude Code"], [795, 734, "python-ai", "Git-Only"], [870, 875, "python-ai", "Claude Code"], [812, 731, "python-ai", "Cursor"], [895, 884, "python-ai", "Codex"], [698, 575, "systems", "Git-Only"], [623, 622, "python-ai", "Claude Code"], [743, 728, "systems", "Hybrid"], [761, 751, "mobile", "Hybrid"], [520, 511, "mobile", "Cursor"], [925, 912, "typescript-nextjs", "Cursor"], [775, 728, "python-ai", "Cursor"], [805, 826, "python-ai", "Claude Code"], [863, 848, "typescript-nextjs", "Hybrid"], [765, 749, "systems", "Cursor"], [907, 897, "systems", "Codex"], [777, 765, "python-ai", "Claude Code"], [659, 589, "systems", "Hybrid"], [761, 754, "systems", "Claude Code"], [651, 604, "python-ai", "Codex"], [761, 688, "python-ai", "Cursor"], [941, 929, "typescript-nextjs", "Hybrid"], [847, 833, "typescript-nextjs", "Claude Code"], [727, 833, "systems", "Hybrid"], [865, 832, "systems", "Claude Code"], [699, 653, "systems", "Hybrid"], [827, 835, "mobile", "Cursor"], [803, 698, "systems", "Cursor"], [659, 682, "typescript-nextjs", "Git-Only"], [597, 640, "python-ai", "Claude Code"], [733, 693, "python-ai", "Git-Only"], [655, 528, "python-ai", "Hybrid"], [696, 602, "typescript-nextjs", "Claude Code"], [676, 633, "python-ai", "Hybrid"], [746, 731, "python-ai", "Hybrid"], [747, 789, "python-ai", "Claude Code"], [763, 783, "typescript-nextjs", "Hybrid"], [811, 835, "typescript-nextjs", "Cursor"], [768, 753, "python-ai", "Claude Code"], [725, 601, "systems", "Cursor"], [876, 813, "python-ai", "Cursor"], [595, 595, "typescript-nextjs", "Claude Code"]];

// packages/shared/dist/percentile.js
var BENCHMARK_SCORES = BENCHMARK.map((b) => b[0]).sort((a, b) => a - b);
var BENCHMARK_SIZE = BENCHMARK_SCORES.length;

// packages/shared/dist/achievements.js
var slug = (s) => s.toLowerCase().replace(/\+/g, "p").replace(/#/g, "sharp").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
var fmt = (n) => n.toLocaleString("en-US");
var monthYear = (iso) => (/* @__PURE__ */ new Date(`${iso}T00:00:00Z`)).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
function rarity(value, thresholds) {
  if (value >= thresholds[2])
    return "legendary";
  if (value >= thresholds[1])
    return "epic";
  if (value >= thresholds[0])
    return "rare";
  return "common";
}
function yearsBetween(first, last) {
  const ms = Date.parse(`${last}T00:00:00Z`) - Date.parse(`${first}T00:00:00Z`);
  return Math.max(0, Math.round(ms / (365.25 * 864e5) * 10) / 10);
}
function deriveAchievements(p, opts = { tier: "self-reported" }) {
  const tier = opts.tier;
  const out = [];
  if (opts.topPercent) {
    const t = opts.topPercent;
    out.push({
      id: "percentile",
      kind: "global-rank",
      eyebrow: "STANDING",
      value: `Top ${t}%`,
      title: "of verified developers on Perfstaq",
      detail: `Overall index ${p.overallScore}/1000`,
      rarity: t <= 1 ? "legendary" : t <= 5 ? "epic" : t <= 10 ? "rare" : "common",
      tier,
      shareText: `I'm in the top ${t}% of verified developers on Perfstaq (${p.overallScore}/1000), ranked on engineering rigor and AI code that survives review.`
    });
  }
  const arch2 = archetypeInfo(p.archetype);
  out.push({
    id: "archetype",
    kind: "archetype",
    eyebrow: "BUILDER ARCHETYPE",
    value: arch2.name,
    title: arch2.tagline,
    detail: arch2.traits.slice(0, 2).join(" \xB7 "),
    rarity: rarity(p.overallScore, [600, 750, 880]),
    tier,
    shareText: `My Perfstaq builder archetype: ${arch2.name}. ${arch2.tagline}`
  });
  for (const t of p.languageTimeline.slice(0, 2)) {
    const yrs = yearsBetween(t.firstCommitAt, t.lastCommitAt);
    if (t.commits < 10)
      continue;
    const span = yrs >= 1 ? `${yrs} yrs` : `${t.activeMonths} mo`;
    out.push({
      id: `experience-${slug(t.language)}`,
      kind: "experience",
      eyebrow: `${t.language.toUpperCase()} EXPERIENCE`,
      value: span,
      title: `of ${t.language}, ${fmt(t.commits)} own commits`,
      detail: `${monthYear(t.firstCommitAt)} \u2192 ${monthYear(t.lastCommitAt)} \xB7 active ${t.activeMonths} months`,
      rarity: rarity(t.commits, [100, 500, 1500]),
      tier,
      shareText: `${span} of ${t.language} on record: ${fmt(t.commits)} of my own commits, ${monthYear(t.firstCommitAt)} to ${monthYear(t.lastCommitAt)}.`
    });
  }
  const best = [...p.stackBreakdown].filter((st) => st.verifiedCommits >= 10).sort((x, y) => y.stackRating - x.stackRating)[0];
  if (best && best.stackRating >= 50) {
    const name = best.framework ? `${best.language} / ${best.framework}` : best.language;
    out.push({
      id: `stack-${slug(best.language)}`,
      kind: "stack-master",
      eyebrow: "BEST STACK",
      value: `${best.stackRating}/100`,
      title: `${name} rating on verified commits`,
      detail: `${fmt(best.verifiedCommits)} verified commits \xB7 ${best.percentage}% of your work`,
      rarity: rarity(best.stackRating, [75, 85, 93]),
      tier,
      shareText: `My ${name} is rated ${best.stackRating}/100 on Perfstaq, from ${fmt(best.verifiedCommits)} verified commits.`
    });
  }
  const tools = p.aiToolsDetected;
  if (tools.primaryTool !== "Git-Only") {
    out.push({
      id: "ai-survival",
      kind: "ai-survival",
      eyebrow: "AI CODE SURVIVAL",
      value: `${p.aiMetrics.aiSurvivalRate}%`,
      title: "of AI-assisted lines survive 24h",
      detail: `${p.aiMetrics.humanEditRatio}% human-written \xB7 anti-slop score ${p.subScores.aiSurvival}/1000`,
      rarity: rarity(p.aiMetrics.aiSurvivalRate, [80, 90, 96]),
      tier,
      shareText: `${p.aiMetrics.aiSurvivalRate}% of my AI-assisted code survives review. Shipping with AI, without the slop.`
    });
    const used = [tools.claudeCode && "Claude Code", tools.cursor && "Cursor", tools.codex && "Codex"].filter(Boolean);
    out.push({
      id: "orchestrator",
      kind: "orchestrator",
      eyebrow: "AGENT ORCHESTRATION",
      value: fmt(p.aiMetrics.agentSessionsAnalyzed),
      title: "AI agent sessions analyzed",
      detail: `${used.join(" + ")} \xB7 ${p.aiMetrics.toolCallsPerSession} tool calls/session`,
      rarity: rarity(p.aiMetrics.agentSessionsAnalyzed * (used.length >= 2 ? 1.5 : 1), [100, 300, 800]),
      tier,
      shareText: `${fmt(p.aiMetrics.agentSessionsAnalyzed)} AI agent sessions with ${used.join(" + ")}, measured locally with Perfstaq.`
    });
  }
  out.push({
    id: "rigor",
    kind: "rigor",
    eyebrow: "ENGINEERING RIGOR",
    value: `${p.subScores.rigor}`,
    title: "rigor index out of 1000",
    detail: `${p.rigorMetrics.testCoverageDelta}% test lines \xB7 ${p.rigorMetrics.revertRate24h}% reverted in 24h`,
    rarity: rarity(p.subScores.rigor, [600, 750, 880]),
    tier,
    shareText: `Engineering rigor ${p.subScores.rigor}/1000 on Perfstaq: ${p.rigorMetrics.testCoverageDelta}% test lines, ${p.rigorMetrics.revertRate24h}% reverts.`
  });
  const r = p.rigorMetrics;
  if (r.testCoverageDelta >= 5) {
    out.push({
      id: "tests",
      kind: "tests",
      eyebrow: "TEST DISCIPLINE",
      value: `${r.testCoverageDelta}%`,
      title: "test lines for every 100 lines shipped",
      detail: `${r.revertRate24h}% of commits reverted within 24h`,
      rarity: rarity(r.testCoverageDelta, [15, 25, 40]),
      tier,
      shareText: `I write ${r.testCoverageDelta} lines of tests for every 100 lines I ship, measured on my own commits with Perfstaq.`
    });
  }
  if (r.refactorRatio >= 8) {
    out.push({
      id: "refactor",
      kind: "refactor",
      eyebrow: "LEAVES IT CLEANER",
      value: `${r.refactorRatio}%`,
      title: "of commits are multi-file refactors",
      detail: `${r.avgFilesPerCommit} files touched per commit on average`,
      rarity: rarity(r.refactorRatio, [15, 22, 30]),
      tier,
      shareText: `${r.refactorRatio}% of my commits are refactors. I leave codebases cleaner than I found them.`
    });
  }
  if (p.commitsAnalyzed >= 50) {
    out.push({
      id: "shipping",
      kind: "shipping",
      eyebrow: "SHIPPED",
      value: fmt(p.commitsAnalyzed),
      title: "own commits on record",
      detail: `${p.reposAnalyzed} ${p.reposAnalyzed === 1 ? "repo" : "repos"} \xB7 ${p.languageTimeline.length} languages`,
      rarity: rarity(p.commitsAnalyzed, [500, 1500, 4e3]),
      tier,
      shareText: `${fmt(p.commitsAnalyzed)} of my own commits across ${p.reposAnalyzed} repos, measured locally with Perfstaq.`
    });
  }
  if (p.rolling30dScore >= 500) {
    const delta = p.rolling30dScore - p.overallScore;
    out.push({
      id: "momentum",
      kind: "momentum",
      eyebrow: "LAST 30 DAYS",
      value: `${p.rolling30dScore}`,
      title: "score from this month alone",
      detail: delta >= 0 ? `+${delta} above the all-time index` : `All-time index ${p.overallScore}/1000`,
      rarity: rarity(p.rolling30dScore, [700, 820, 900]),
      tier,
      shareText: `My last 30 days on Perfstaq: ${p.rolling30dScore}/1000.`
    });
  }
  const strong = p.stackBreakdown.filter((s) => s.stackRating >= 60 && s.percentage >= 5);
  if (strong.length >= 3) {
    out.push({
      id: "polyglot",
      kind: "polyglot",
      eyebrow: "POLYGLOT",
      value: `${strong.length} stacks`,
      title: "rated 60+ on verified commits",
      detail: strong.slice(0, 4).map((s) => `${s.language} ${s.stackRating}`).join(" \xB7 "),
      rarity: rarity(strong.length, [3, 4, 6]),
      tier,
      shareText: `${strong.length} stacks rated 60+ on Perfstaq: ${strong.slice(0, 4).map((s) => s.language).join(", ")}.`
    });
  }
  return out;
}

// packages/cli/src/auth.ts
import { randomBytes, timingSafeEqual } from "node:crypto";
import { createServer } from "node:http";

// node_modules/.pnpm/open@10.2.0/node_modules/open/index.js
import process16 from "node:process";
import { Buffer as Buffer2 } from "node:buffer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify as promisify5 } from "node:util";
import childProcess from "node:child_process";
import fs5, { constants as fsConstants2 } from "node:fs/promises";

// node_modules/.pnpm/wsl-utils@0.1.0/node_modules/wsl-utils/index.js
import process11 from "node:process";
import fs4, { constants as fsConstants } from "node:fs/promises";

// node_modules/.pnpm/is-wsl@3.1.1/node_modules/is-wsl/index.js
import process10 from "node:process";
import os2 from "node:os";
import fs3 from "node:fs";

// node_modules/.pnpm/is-inside-container@1.0.0/node_modules/is-inside-container/index.js
import fs2 from "node:fs";

// node_modules/.pnpm/is-docker@3.0.0/node_modules/is-docker/index.js
import fs from "node:fs";
var isDockerCached;
function hasDockerEnv() {
  try {
    fs.statSync("/.dockerenv");
    return true;
  } catch {
    return false;
  }
}
function hasDockerCGroup() {
  try {
    return fs.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
  } catch {
    return false;
  }
}
function isDocker() {
  if (isDockerCached === void 0) {
    isDockerCached = hasDockerEnv() || hasDockerCGroup();
  }
  return isDockerCached;
}

// node_modules/.pnpm/is-inside-container@1.0.0/node_modules/is-inside-container/index.js
var cachedResult;
var hasContainerEnv = () => {
  try {
    fs2.statSync("/run/.containerenv");
    return true;
  } catch {
    return false;
  }
};
function isInsideContainer() {
  if (cachedResult === void 0) {
    cachedResult = hasContainerEnv() || isDocker();
  }
  return cachedResult;
}

// node_modules/.pnpm/is-wsl@3.1.1/node_modules/is-wsl/index.js
var isWsl = () => {
  if (process10.platform !== "linux") {
    return false;
  }
  if (os2.release().toLowerCase().includes("microsoft")) {
    if (isInsideContainer()) {
      return false;
    }
    return true;
  }
  try {
    if (fs3.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft")) {
      return !isInsideContainer();
    }
  } catch {
  }
  if (fs3.existsSync("/proc/sys/fs/binfmt_misc/WSLInterop") || fs3.existsSync("/run/WSL")) {
    return !isInsideContainer();
  }
  return false;
};
var is_wsl_default = process10.env.__IS_WSL_TEST__ ? isWsl : isWsl();

// node_modules/.pnpm/wsl-utils@0.1.0/node_modules/wsl-utils/index.js
var wslDrivesMountPoint = /* @__PURE__ */ (() => {
  const defaultMountPoint = "/mnt/";
  let mountPoint;
  return async function() {
    if (mountPoint) {
      return mountPoint;
    }
    const configFilePath = "/etc/wsl.conf";
    let isConfigFileExists = false;
    try {
      await fs4.access(configFilePath, fsConstants.F_OK);
      isConfigFileExists = true;
    } catch {
    }
    if (!isConfigFileExists) {
      return defaultMountPoint;
    }
    const configContent = await fs4.readFile(configFilePath, { encoding: "utf8" });
    const configMountPoint = /(?<!#.*)root\s*=\s*(?<mountPoint>.*)/g.exec(configContent);
    if (!configMountPoint) {
      return defaultMountPoint;
    }
    mountPoint = configMountPoint.groups.mountPoint.trim();
    mountPoint = mountPoint.endsWith("/") ? mountPoint : `${mountPoint}/`;
    return mountPoint;
  };
})();
var powerShellPathFromWsl = async () => {
  const mountPoint = await wslDrivesMountPoint();
  return `${mountPoint}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe`;
};
var powerShellPath = async () => {
  if (is_wsl_default) {
    return powerShellPathFromWsl();
  }
  return `${process11.env.SYSTEMROOT || process11.env.windir || String.raw`C:\Windows`}\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`;
};

// node_modules/.pnpm/define-lazy-prop@3.0.0/node_modules/define-lazy-prop/index.js
function defineLazyProperty(object, propertyName, valueGetter) {
  const define = (value) => Object.defineProperty(object, propertyName, { value, enumerable: true, writable: true });
  Object.defineProperty(object, propertyName, {
    configurable: true,
    enumerable: true,
    get() {
      const result = valueGetter();
      define(result);
      return result;
    },
    set(value) {
      define(value);
    }
  });
  return object;
}

// node_modules/.pnpm/default-browser@5.5.1/node_modules/default-browser/index.js
import { promisify as promisify4 } from "node:util";
import process15 from "node:process";
import { execFile as execFile4 } from "node:child_process";

// node_modules/.pnpm/default-browser-id@5.0.1/node_modules/default-browser-id/index.js
import { promisify } from "node:util";
import process12 from "node:process";
import { execFile } from "node:child_process";
var execFileAsync = promisify(execFile);
async function defaultBrowserId() {
  if (process12.platform !== "darwin") {
    throw new Error("macOS only");
  }
  const { stdout } = await execFileAsync("defaults", ["read", "com.apple.LaunchServices/com.apple.launchservices.secure", "LSHandlers"]);
  const match = /LSHandlerRoleAll = "(?!-)(?<id>[^"]+?)";\s+?LSHandlerURLScheme = (?:http|https);/.exec(stdout);
  const browserId = match?.groups.id ?? "com.apple.Safari";
  if (browserId === "com.apple.safari") {
    return "com.apple.Safari";
  }
  return browserId;
}

// node_modules/.pnpm/run-applescript@7.1.0/node_modules/run-applescript/index.js
import process13 from "node:process";
import { promisify as promisify2 } from "node:util";
import { execFile as execFile2, execFileSync } from "node:child_process";
var execFileAsync2 = promisify2(execFile2);
async function runAppleScript(script, { humanReadableOutput = true, signal } = {}) {
  if (process13.platform !== "darwin") {
    throw new Error("macOS only");
  }
  const outputArguments = humanReadableOutput ? [] : ["-ss"];
  const execOptions = {};
  if (signal) {
    execOptions.signal = signal;
  }
  const { stdout } = await execFileAsync2("osascript", ["-e", script, outputArguments], execOptions);
  return stdout.trim();
}

// node_modules/.pnpm/bundle-name@4.1.1/node_modules/bundle-name/index.js
var bundleIdentifierPattern = /^[^\n\r"\\]+$/u;
async function bundleName(bundleId) {
  if (typeof bundleId !== "string") {
    throw new TypeError("Expected a string bundle identifier");
  }
  if (!bundleIdentifierPattern.test(bundleId)) {
    throw new TypeError(`Invalid bundle identifier: ${JSON.stringify(bundleId)}`);
  }
  return runAppleScript(`tell application "Finder" to set app_path to application file id "${bundleId}" as string
tell application "System Events" to get value of property list item "CFBundleName" of property list file (app_path & ":Contents:Info.plist")`);
}

// node_modules/.pnpm/default-browser@5.5.1/node_modules/default-browser/windows.js
import process14 from "node:process";
import { promisify as promisify3 } from "node:util";
import { execFile as execFile3 } from "node:child_process";
var execFileAsync3 = promisify3(execFile3);
var windowsBrowserProgIds = {
  MSEdgeHTM: { name: "Edge", id: "com.microsoft.edge" },
  // The missing `L` is correct.
  MSEdgeBHTML: { name: "Edge Beta", id: "com.microsoft.edge.beta" },
  MSEdgeDHTML: { name: "Edge Dev", id: "com.microsoft.edge.dev" },
  AppXq0fevzme2pys62n3e0fbqa7peapykr8v: { name: "Edge", id: "com.microsoft.edge.old" },
  ChromeHTML: { name: "Chrome", id: "com.google.chrome" },
  ChromeBHTML: { name: "Chrome Beta", id: "com.google.chrome.beta" },
  ChromeDHTML: { name: "Chrome Dev", id: "com.google.chrome.dev" },
  ChromiumHTM: { name: "Chromium", id: "org.chromium.Chromium" },
  BraveHTML: { name: "Brave", id: "com.brave.Browser" },
  BraveBHTML: { name: "Brave Beta", id: "com.brave.Browser.beta" },
  BraveDHTML: { name: "Brave Dev", id: "com.brave.Browser.dev" },
  BraveSSHTM: { name: "Brave Nightly", id: "com.brave.Browser.nightly" },
  FirefoxURL: { name: "Firefox", id: "org.mozilla.firefox" },
  OperaStable: { name: "Opera", id: "com.operasoftware.Opera" },
  VivaldiHTM: { name: "Vivaldi", id: "com.vivaldi.Vivaldi" },
  "IE.HTTP": { name: "Internet Explorer", id: "com.microsoft.ie" }
};
var _windowsBrowserProgIdMap = new Map(Object.entries(windowsBrowserProgIds));
var UnknownBrowserError = class extends Error {
};
async function defaultBrowser(_execFileAsync = execFileAsync3) {
  const regPath = `${process14.env.SYSTEMROOT ?? process14.env.windir ?? "C:\\Windows"}\\System32\\reg.exe`;
  const { stdout } = await _execFileAsync(regPath, [
    "QUERY",
    " HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice",
    "/v",
    "ProgId"
  ]);
  const match = /ProgId\s*REG_SZ\s*(?<id>\S+)/.exec(stdout);
  if (!match) {
    throw new UnknownBrowserError(`Cannot find Windows browser in stdout: ${JSON.stringify(stdout)}`);
  }
  const { id } = match.groups;
  const dotIndex = id.lastIndexOf(".");
  const hyphenIndex = id.lastIndexOf("-");
  const baseIdByDot = dotIndex === -1 ? void 0 : id.slice(0, dotIndex);
  const baseIdByHyphen = hyphenIndex === -1 ? void 0 : id.slice(0, hyphenIndex);
  return windowsBrowserProgIds[id] ?? windowsBrowserProgIds[baseIdByDot] ?? windowsBrowserProgIds[baseIdByHyphen] ?? { name: id, id };
}

// node_modules/.pnpm/default-browser@5.5.1/node_modules/default-browser/index.js
var execFileAsync4 = promisify4(execFile4);
var titleize = (string) => string.toLowerCase().replaceAll(/(?:^|\s|-)\S/g, (x) => x.toUpperCase());
async function defaultBrowser2() {
  if (process15.platform === "darwin") {
    const id = await defaultBrowserId();
    const name = await bundleName(id);
    return { name, id };
  }
  if (process15.platform === "linux") {
    const { stdout } = await execFileAsync4("xdg-mime", ["query", "default", "x-scheme-handler/http"]);
    const id = stdout.trim();
    const name = titleize(id.replace(/.desktop$/, "").replace("-", " "));
    return { name, id };
  }
  if (process15.platform === "win32") {
    return defaultBrowser();
  }
  throw new Error("Only macOS, Linux, and Windows are supported");
}

// node_modules/.pnpm/open@10.2.0/node_modules/open/index.js
var execFile5 = promisify5(childProcess.execFile);
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var localXdgOpenPath = path.join(__dirname, "xdg-open");
var { platform, arch } = process16;
async function getWindowsDefaultBrowserFromWsl() {
  const powershellPath = await powerShellPath();
  const rawCommand = String.raw`(Get-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\Shell\Associations\UrlAssociations\http\UserChoice").ProgId`;
  const encodedCommand = Buffer2.from(rawCommand, "utf16le").toString("base64");
  const { stdout } = await execFile5(
    powershellPath,
    [
      "-NoProfile",
      "-NonInteractive",
      "-ExecutionPolicy",
      "Bypass",
      "-EncodedCommand",
      encodedCommand
    ],
    { encoding: "utf8" }
  );
  const progId = stdout.trim();
  const browserMap = {
    ChromeHTML: "com.google.chrome",
    BraveHTML: "com.brave.Browser",
    MSEdgeHTM: "com.microsoft.edge",
    FirefoxURL: "org.mozilla.firefox"
  };
  return browserMap[progId] ? { id: browserMap[progId] } : {};
}
var pTryEach = async (array, mapper) => {
  let latestError;
  for (const item of array) {
    try {
      return await mapper(item);
    } catch (error) {
      latestError = error;
    }
  }
  throw latestError;
};
var baseOpen = async (options) => {
  options = {
    wait: false,
    background: false,
    newInstance: false,
    allowNonzeroExitCode: false,
    ...options
  };
  if (Array.isArray(options.app)) {
    return pTryEach(options.app, (singleApp) => baseOpen({
      ...options,
      app: singleApp
    }));
  }
  let { name: app, arguments: appArguments = [] } = options.app ?? {};
  appArguments = [...appArguments];
  if (Array.isArray(app)) {
    return pTryEach(app, (appName) => baseOpen({
      ...options,
      app: {
        name: appName,
        arguments: appArguments
      }
    }));
  }
  if (app === "browser" || app === "browserPrivate") {
    const ids = {
      "com.google.chrome": "chrome",
      "google-chrome.desktop": "chrome",
      "com.brave.Browser": "brave",
      "org.mozilla.firefox": "firefox",
      "firefox.desktop": "firefox",
      "com.microsoft.msedge": "edge",
      "com.microsoft.edge": "edge",
      "com.microsoft.edgemac": "edge",
      "microsoft-edge.desktop": "edge"
    };
    const flags = {
      chrome: "--incognito",
      brave: "--incognito",
      firefox: "--private-window",
      edge: "--inPrivate"
    };
    const browser = is_wsl_default ? await getWindowsDefaultBrowserFromWsl() : await defaultBrowser2();
    if (browser.id in ids) {
      const browserName = ids[browser.id];
      if (app === "browserPrivate") {
        appArguments.push(flags[browserName]);
      }
      return baseOpen({
        ...options,
        app: {
          name: apps[browserName],
          arguments: appArguments
        }
      });
    }
    throw new Error(`${browser.name} is not supported as a default browser`);
  }
  let command;
  const cliArguments = [];
  const childProcessOptions = {};
  if (platform === "darwin") {
    command = "open";
    if (options.wait) {
      cliArguments.push("--wait-apps");
    }
    if (options.background) {
      cliArguments.push("--background");
    }
    if (options.newInstance) {
      cliArguments.push("--new");
    }
    if (app) {
      cliArguments.push("-a", app);
    }
  } else if (platform === "win32" || is_wsl_default && !isInsideContainer() && !app) {
    command = await powerShellPath();
    cliArguments.push(
      "-NoProfile",
      "-NonInteractive",
      "-ExecutionPolicy",
      "Bypass",
      "-EncodedCommand"
    );
    if (!is_wsl_default) {
      childProcessOptions.windowsVerbatimArguments = true;
    }
    const encodedArguments = ["Start"];
    if (options.wait) {
      encodedArguments.push("-Wait");
    }
    if (app) {
      encodedArguments.push(`"\`"${app}\`""`);
      if (options.target) {
        appArguments.push(options.target);
      }
    } else if (options.target) {
      encodedArguments.push(`"${options.target}"`);
    }
    if (appArguments.length > 0) {
      appArguments = appArguments.map((argument) => `"\`"${argument}\`""`);
      encodedArguments.push("-ArgumentList", appArguments.join(","));
    }
    options.target = Buffer2.from(encodedArguments.join(" "), "utf16le").toString("base64");
  } else {
    if (app) {
      command = app;
    } else {
      const isBundled = !__dirname || __dirname === "/";
      let exeLocalXdgOpen = false;
      try {
        await fs5.access(localXdgOpenPath, fsConstants2.X_OK);
        exeLocalXdgOpen = true;
      } catch {
      }
      const useSystemXdgOpen = process16.versions.electron ?? (platform === "android" || isBundled || !exeLocalXdgOpen);
      command = useSystemXdgOpen ? "xdg-open" : localXdgOpenPath;
    }
    if (appArguments.length > 0) {
      cliArguments.push(...appArguments);
    }
    if (!options.wait) {
      childProcessOptions.stdio = "ignore";
      childProcessOptions.detached = true;
    }
  }
  if (platform === "darwin" && appArguments.length > 0) {
    cliArguments.push("--args", ...appArguments);
  }
  if (options.target) {
    cliArguments.push(options.target);
  }
  const subprocess = childProcess.spawn(command, cliArguments, childProcessOptions);
  if (options.wait) {
    return new Promise((resolve, reject) => {
      subprocess.once("error", reject);
      subprocess.once("close", (exitCode) => {
        if (!options.allowNonzeroExitCode && exitCode > 0) {
          reject(new Error(`Exited with code ${exitCode}`));
          return;
        }
        resolve(subprocess);
      });
    });
  }
  subprocess.unref();
  return subprocess;
};
var open = (target, options) => {
  if (typeof target !== "string") {
    throw new TypeError("Expected a `target`");
  }
  return baseOpen({
    ...options,
    target
  });
};
function detectArchBinary(binary) {
  if (typeof binary === "string" || Array.isArray(binary)) {
    return binary;
  }
  const { [arch]: archBinary } = binary;
  if (!archBinary) {
    throw new Error(`${arch} is not supported`);
  }
  return archBinary;
}
function detectPlatformBinary({ [platform]: platformBinary }, { wsl }) {
  if (wsl && is_wsl_default) {
    return detectArchBinary(wsl);
  }
  if (!platformBinary) {
    throw new Error(`${platform} is not supported`);
  }
  return detectArchBinary(platformBinary);
}
var apps = {};
defineLazyProperty(apps, "chrome", () => detectPlatformBinary({
  darwin: "google chrome",
  win32: "chrome",
  linux: ["google-chrome", "google-chrome-stable", "chromium"]
}, {
  wsl: {
    ia32: "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    x64: ["/mnt/c/Program Files/Google/Chrome/Application/chrome.exe", "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"]
  }
}));
defineLazyProperty(apps, "brave", () => detectPlatformBinary({
  darwin: "brave browser",
  win32: "brave",
  linux: ["brave-browser", "brave"]
}, {
  wsl: {
    ia32: "/mnt/c/Program Files (x86)/BraveSoftware/Brave-Browser/Application/brave.exe",
    x64: ["/mnt/c/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe", "/mnt/c/Program Files (x86)/BraveSoftware/Brave-Browser/Application/brave.exe"]
  }
}));
defineLazyProperty(apps, "firefox", () => detectPlatformBinary({
  darwin: "firefox",
  win32: String.raw`C:\Program Files\Mozilla Firefox\firefox.exe`,
  linux: "firefox"
}, {
  wsl: "/mnt/c/Program Files/Mozilla Firefox/firefox.exe"
}));
defineLazyProperty(apps, "edge", () => detectPlatformBinary({
  darwin: "microsoft edge",
  win32: "msedge",
  linux: ["microsoft-edge", "microsoft-edge-dev"]
}, {
  wsl: "/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
}));
defineLazyProperty(apps, "browser", () => "browser");
defineLazyProperty(apps, "browserPrivate", () => "browserPrivate");
var open_default = open;

// packages/cli/src/auth.ts
var PAGE = (msg) => `<!doctype html><meta charset="utf-8"><title>Perfstaq</title><body style="font-family:system-ui;background:#0b0b10;color:#eee;display:grid;place-items:center;height:100vh;margin:0"><div style="text-align:center;font-family:ui-monospace,Menlo,monospace"><h2 style="color:#ff6a1a">${msg}</h2><p>Go back to your terminal window to finish. You can close this tab.</p></div></body>`;
function listen(server) {
  return new Promise((resolve, reject) => {
    const onError = (err) => {
      if (err.code === "EADDRINUSE") {
        server.removeListener("error", onError);
        server.once("error", reject);
        server.listen(0, "127.0.0.1", () => resolve(server.address().port));
      } else reject(err);
    };
    server.once("error", onError);
    server.listen(CLI_CALLBACK_PORT, "127.0.0.1", () => {
      server.removeListener("error", onError);
      resolve(server.address().port);
    });
  });
}
async function browserLogin(api, onUrl, timeoutMs = 3e5) {
  const state = randomBytes(16).toString("hex");
  let done = () => void 0;
  const result = new Promise((r2) => done = r2);
  const MAX_BODY = 16 * 1024;
  const safeEqual = (x, y) => {
    const bx = Buffer.from(x);
    const by = Buffer.from(y);
    return bx.length === by.length && timingSafeEqual(bx, by);
  };
  const html = (res, code, msg) => res.writeHead(code, { "content-type": "text/html", "cache-control": "no-store" }).end(PAGE(msg));
  const server = createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://127.0.0.1");
    if (url.pathname !== "/callback") {
      res.writeHead(404).end();
      return;
    }
    if (req.method !== "POST") {
      res.writeHead(405, { allow: "POST" }).end();
      return;
    }
    if (url.search) {
      res.writeHead(400).end();
      return;
    }
    let size = 0;
    const chunks = [];
    let aborted = false;
    req.on("data", (c) => {
      size += c.length;
      if (size > MAX_BODY) {
        aborted = true;
        res.writeHead(413, { connection: "close" }).end();
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => {
      if (aborted) return;
      const form = new URLSearchParams(Buffer.concat(chunks).toString("utf8"));
      const token = form.get("token");
      const username = form.get("username");
      const got = form.get("state") ?? "";
      if (!safeEqual(got, state) || !token || !username) {
        html(res, 400, "Sign-in failed");
        return;
      }
      html(res, 200, "\u2713 Signed in. One more step in your terminal.");
      done({ token, username });
    });
    req.on("error", () => void 0);
  });
  const port = await listen(server);
  const authUrl = `${api}/cli-auth?port=${port}&state=${state}`;
  onUrl?.(authUrl);
  if (process.env.PERFSTAQ_NO_OPEN !== "1") open_default(authUrl).catch(() => void 0);
  const timer = setTimeout(() => done(new Error("Timed out waiting for browser sign-in (5 min).")), timeoutMs);
  const r = await result;
  clearTimeout(timer);
  server.close();
  server.closeAllConnections?.();
  if (r instanceof Error) throw r;
  return r;
}
var ApiError = class extends Error {
  constructor(message, status, detail = "") {
    super(message);
    this.status = status;
    this.detail = detail;
  }
};
async function errorDetail(res) {
  try {
    const j = await res.json();
    return j.error ?? j.message ?? "";
  } catch {
    return "";
  }
}
function failure(prefix, res, detail) {
  const hint = res.status === 401 ? " (sign-in expired; run the scan again)" : res.status === 429 ? ` (cooldown: Perfstaq accepts one scan per ${SCAN_COOLDOWN_HOURS} hours; try again later)` : "";
  return new ApiError(`${prefix}: HTTP ${res.status}${hint}${detail ? ` - ${detail}` : ""}`, res.status, detail);
}
async function post(api, path2, token, body) {
  try {
    return await fetch(`${api}${path2}`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: body === void 0 ? void 0 : JSON.stringify(body),
      signal: AbortSignal.timeout(3e4)
    });
  } catch (e) {
    throw new Error(`Couldn't reach Perfstaq (fetch failed): ${e.message}`);
  }
}
async function fetchNonce(api, token) {
  const res = await post(api, "/api/scans/nonce", token);
  if (!res.ok) throw failure("Could not get a verification nonce", res, await errorDetail(res));
  const j = await res.json();
  if (!j.nonce) throw new Error("Server returned no nonce.");
  return { nonce: j.nonce, expiresAt: j.expiresAt ?? "" };
}
async function uploadScan(api, token, payload) {
  const res = await post(api, "/api/scans", token, payload);
  if (!res.ok) throw failure("Upload failed", res, await errorDetail(res));
  return await res.json();
}

// packages/cli/src/collectors/claude.ts
import { createReadStream } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline";

// packages/cli/src/collectors/trace.ts
function shellAction(t, command, files) {
  const c = typeof command === "string" || Array.isArray(command) && command.every((x) => typeof x === "string") ? classifyCommand(command) : { kind: "other" };
  switch (c.kind) {
    case "explore":
      return { type: "action", t, kind: "explore" };
    case "check":
      return { type: "action", t, kind: "shell", check: c.check, ...c.outcomeVisible ? {} : { outcomeHidden: true } };
    case "undo":
      return { type: "action", t, kind: "shell", undoes: c.paths === "all" ? "all" : files.match(c.paths) };
    case "commit":
      return { type: "action", t, kind: "shell", commits: true };
    default:
      return { type: "action", t, kind: "shell" };
  }
}
function setOutcome(a, ok2) {
  if (!a.outcomeHidden) a.ok = ok2;
}
function mcpAction(t, name) {
  return { type: "action", t, kind: "mcp", mcp: mcpCategory(name) };
}
function toSec(v) {
  const n = typeof v === "number" ? v : typeof v === "string" ? /^\d+$/.test(v) ? Number(v) : Date.parse(v) : NaN;
  if (!Number.isFinite(n) || n <= 0) return null;
  return Math.floor(n > 1e12 ? n / 1e3 : n);
}
var str = (v) => typeof v === "string" ? v : void 0;

// packages/cli/src/collectors/claude.ts
var EDIT_TOOLS = /* @__PURE__ */ new Set(["Edit", "Write", "MultiEdit", "NotebookEdit"]);
var EXPLORE_TOOLS = /* @__PURE__ */ new Set(["Read", "Grep", "Glob", "LS", "NotebookRead", "WebSearch", "WebFetch", "ToolSearch", "BashOutput", "LSP"]);
var PLAN_TOOLS = /* @__PURE__ */ new Set(["TodoWrite", "TodoRead", "TaskCreate", "TaskUpdate", "TaskList", "EnterPlanMode", "ExitPlanMode"]);
var SUBAGENT_TOOLS = /* @__PURE__ */ new Set(["Task", "Agent"]);
var SHELL_TOOLS = /* @__PURE__ */ new Set(["Bash", "PowerShell"]);
var INTERRUPT_MARK = "[Request interrupted by user";
var REJECT_MARKS = ["The user doesn't want to proceed", "User rejected", "Permission for this tool use was denied", "Error: Permission for this tool use was denied"];
var SYSTEM_TURN = /^<(?:local-command-(?:stdout|stderr|caveat)|system-reminder|bash-(?:stdout|stderr))>/;
var MAX_FILES = 300;
var MAX_LINE = 1024 * 1024;
var EMPTY = {
  signals: { detected: false, sessions: 0, toolCalls: 0, editToolCalls: 0, prompts: 0 },
  windows: [],
  traces: []
};
async function listJsonl(root) {
  const out = [];
  const projects = await readdir(root, { withFileTypes: true });
  for (const p of projects) {
    if (!p.isDirectory()) continue;
    const dir = join(root, p.name);
    let names = [];
    try {
      names = await readdir(dir);
    } catch {
      continue;
    }
    for (const n of names) {
      if (!n.endsWith(".jsonl")) continue;
      const file = join(dir, n);
      try {
        const s = await stat(file);
        if (s.isFile()) out.push({ file, mtime: s.mtimeMs });
      } catch {
      }
    }
  }
  return out;
}
var startsWithAny = (s, marks) => typeof s === "string" && marks.some((m) => s.startsWith(m));
function resultText(c) {
  if (typeof c === "string") return c;
  if (Array.isArray(c)) {
    const first = c.find((x) => x?.type === "text");
    return typeof first?.text === "string" ? first.text : void 0;
  }
  return void 0;
}
function toolAction(name, input, t, files) {
  if (EDIT_TOOLS.has(name)) {
    const path2 = str(input.file_path) ?? str(input.notebook_path);
    if (!path2) return { type: "action", t, kind: "edit" };
    const target = files.id(path2);
    let reverts = false;
    if (name === "Edit") reverts = files.edit(target, str(input.old_string) ?? "", str(input.new_string) ?? "");
    if (name === "MultiEdit" && Array.isArray(input.edits)) {
      for (const e of input.edits) if (files.edit(target, str(e?.old_string) ?? "", str(e?.new_string) ?? "")) reverts = true;
    }
    return { type: "action", t, kind: "edit", target, ...reverts ? { reverts } : {} };
  }
  if (SHELL_TOOLS.has(name)) return shellAction(t, input.command, files);
  if (EXPLORE_TOOLS.has(name)) return { type: "action", t, kind: "explore" };
  if (PLAN_TOOLS.has(name)) return { type: "action", t, kind: "plan" };
  if (SUBAGENT_TOOLS.has(name)) return { type: "action", t, kind: "subagent" };
  if (name === "AskUserQuestion") return { type: "action", t, kind: "ask" };
  if (name.startsWith("mcp__")) return mcpAction(t, name.slice(5));
  return { type: "action", t, kind: "other" };
}
async function scanFile(file) {
  const events = [];
  const models = /* @__PURE__ */ new Set();
  const pending = /* @__PURE__ */ new Map();
  const seen = /* @__PURE__ */ new Set();
  const files = new SessionFiles();
  const s = { toolCalls: 0, editToolCalls: 0, prompts: 0, min: Infinity, max: -Infinity, trace: { agent: "claude-code", events, models: [] } };
  const rl = createInterface({ input: createReadStream(file, { encoding: "utf8" }), crlfDelay: Infinity });
  for await (const line of rl) {
    if (line.length > MAX_LINE || line.length < 2) continue;
    let e;
    try {
      e = JSON.parse(line);
    } catch {
      continue;
    }
    if (!e || typeof e !== "object") continue;
    const o = e;
    if (typeof o.timestamp === "string" || typeof o.timestamp === "number") {
      const t2 = typeof o.timestamp === "number" ? o.timestamp : Date.parse(o.timestamp);
      if (Number.isFinite(t2)) {
        const sec = Math.floor(t2 > 1e12 ? t2 / 1e3 : t2);
        if (sec < s.min) s.min = sec;
        if (sec > s.max) s.max = sec;
      }
    }
    const msg = o.message;
    const content = msg?.content;
    const t = toSec(o.timestamp);
    const main2 = o.isSidechain !== true;
    if (o.type === "user") {
      const isToolResult = Array.isArray(content) && content.some((c) => c?.type === "tool_result");
      if (!isToolResult && !o.isMeta) s.prompts++;
      if (main2 && isToolResult) {
        const tur = o.toolUseResult;
        const decision = o.permissionDecision?.decision;
        for (const c of content) {
          if (c?.type !== "tool_result" || typeof c.tool_use_id !== "string") continue;
          const a = pending.get(c.tool_use_id);
          if (!a) continue;
          pending.delete(c.tool_use_id);
          setOutcome(a, c.is_error !== true);
          if (decision === "reject" || startsWithAny(tur, REJECT_MARKS) || startsWithAny(resultText(c.content), REJECT_MARKS)) a.denied = true;
          if (tur && typeof tur === "object") {
            if (tur.interrupted === true) a.interrupted = true;
            if (tur.userModified === true && a.kind === "edit") a.userModified = true;
          }
        }
      } else if (main2 && !o.isMeta) {
        const text = typeof content === "string" ? content : resultText(content);
        if (startsWithAny(text, [INTERRUPT_MARK])) events.push({ type: "interrupt", t });
        else if (!(typeof text === "string" && SYSTEM_TURN.test(text))) events.push({ type: "prompt", t });
      }
    }
    if (o.type === "assistant" && Array.isArray(content)) {
      const fam = main2 ? modelFamily(str(msg?.model)) : null;
      if (fam) models.add(fam);
      for (const c of content) {
        const b = c;
        if (b && b.type === "tool_use") {
          s.toolCalls++;
          if (typeof b.name === "string" && EDIT_TOOLS.has(b.name)) s.editToolCalls++;
          if (!main2 || typeof b.name !== "string") continue;
          if (typeof b.id === "string") {
            if (seen.has(b.id)) continue;
            seen.add(b.id);
          }
          const input = b.input && typeof b.input === "object" ? b.input : {};
          const a = toolAction(b.name, input, t, files);
          events.push(a);
          if (typeof b.id === "string") pending.set(b.id, a);
        }
      }
    }
  }
  s.trace.models = [...models].sort();
  return s;
}
async function collectClaude(home = homedir()) {
  try {
    const root = join(home, ".claude", "projects");
    const files = (await listJsonl(root)).sort((a, b) => b.mtime - a.mtime).slice(0, MAX_FILES);
    if (files.length === 0) return EMPTY;
    const signals2 = { detected: true, sessions: 0, toolCalls: 0, editToolCalls: 0, prompts: 0 };
    const windows = [];
    const traces = [];
    const deadline = Date.now() + 5e3;
    for (const f of files) {
      if (Date.now() > deadline) break;
      try {
        const s = await scanFile(f.file);
        traces.push(s.trace);
        signals2.sessions++;
        signals2.toolCalls += s.toolCalls;
        signals2.editToolCalls += s.editToolCalls;
        signals2.prompts += s.prompts;
        if (Number.isFinite(s.min) && Number.isFinite(s.max)) windows.push({ start: s.min, end: s.max });
      } catch {
      }
    }
    if (signals2.sessions === 0) return EMPTY;
    return { signals: signals2, windows, traces };
  } catch {
    return EMPTY;
  }
}

// packages/cli/src/collectors/codex.ts
import { createReadStream as createReadStream2 } from "node:fs";
import { readdir as readdir2, stat as stat2 } from "node:fs/promises";
import { homedir as homedir2 } from "node:os";
import { join as join2 } from "node:path";
import { createInterface as createInterface2 } from "node:readline";
var MAX_FILES2 = 300;
var MAX_LINE2 = 1024 * 1024;
var BUDGET_MS = 5e3;
var TOOL_TYPES = /* @__PURE__ */ new Set(["function_call", "local_shell_call", "custom_tool_call"]);
var MARKER = /"type":"(function_call|local_shell_call|custom_tool_call)"/;
var TS = /^\{"timestamp":"([^"]+)"/;
var STRUCTURAL = /"type":"(?:function_call|function_call_output|custom_tool_call|custom_tool_call_output|local_shell_call|item_completed|user_message|turn_aborted|turn_context|exec_command_end)"/;
var SHELL_FNS = /* @__PURE__ */ new Set(["shell", "container.exec", "exec_command", "local_shell", "unified_exec"]);
var EXPLORE_PARSED = /* @__PURE__ */ new Set(["read", "search", "list_files"]);
var ABORT_MARK = /^(?:aborted by user|aborted before|exec command rejected by user|patch rejected by user)/i;
var EMPTY2 = { signals: { detected: false, sessions: 0, toolCalls: 0 }, windows: [], traces: [] };
function patchFiles(patch) {
  const out = /* @__PURE__ */ new Set();
  for (const m of patch.matchAll(/^\*\*\* (?:Update|Add|Delete) File: (.+)$/gm)) out.add(m[1].trim());
  if (out.size === 0) {
    for (const m of patch.matchAll(/^\+\+\+ (?:b\/)?(.+)$/gm)) if (m[1] !== "/dev/null") out.add(m[1].trim());
  }
  return [...out];
}
function parseJson(s) {
  if (typeof s !== "string") return s && typeof s === "object" ? s : null;
  try {
    const v = JSON.parse(s);
    return v && typeof v === "object" ? v : null;
  } catch {
    return null;
  }
}
var CodexTrace = class {
  classic = [];
  items = [];
  models = /* @__PURE__ */ new Set();
  pending = /* @__PURE__ */ new Map();
  files = new SessionFiles();
  edits(t, patch) {
    const paths = typeof patch === "string" ? patchFiles(patch) : [];
    if (paths.length === 0) return [{ type: "action", t, kind: "edit" }];
    return paths.map((p) => ({ type: "action", t, kind: "edit", target: this.files.id(p) }));
  }
  line(o) {
    const t = toSec(o.timestamp);
    const p = o.payload ?? {};
    const pt = str(p.type);
    if (o.type === "turn_context") {
      const fam = modelFamily(str(p.model));
      if (fam) this.models.add(fam);
      return;
    }
    if (o.type === "event_msg") {
      if (pt === "user_message") this.classic.push({ type: "prompt", t });
      else if (pt === "turn_aborted") {
        this.classic.push({ type: "interrupt", t });
        this.items.push({ type: "interrupt", t });
      } else if (pt === "exec_command_end" && typeof p.call_id === "string") {
        const a = this.pending.get(p.call_id);
        if (a && a.ok === void 0 && typeof p.exit_code === "number") setOutcome(a, p.exit_code === 0);
      } else if (pt === "item_completed") this.item(t, p.item ?? {});
      return;
    }
    if (o.type !== "response_item") return;
    if (pt === "function_call" || pt === "custom_tool_call" || pt === "local_shell_call") {
      const name = str(p.name) ?? (pt === "local_shell_call" ? "local_shell" : "");
      const args = pt === "function_call" ? parseJson(p.arguments) ?? {} : {};
      let actions;
      if (pt === "local_shell_call") actions = [shellAction(t, p.action?.command, this.files)];
      else if (SHELL_FNS.has(name)) actions = [shellAction(t, args.command ?? args.cmd, this.files)];
      else if (name === "apply_patch") actions = this.edits(t, pt === "custom_tool_call" ? p.input : args.input ?? args.patch);
      else if (name === "update_plan") actions = [{ type: "action", t, kind: "plan" }];
      else if (name === "view_image" || name === "web_search") actions = [{ type: "action", t, kind: "explore" }];
      else if (name === "spawn_agent") actions = [{ type: "action", t, kind: "subagent" }];
      else if (name.startsWith("request_user_input")) actions = [{ type: "action", t, kind: "ask" }];
      else if (name.startsWith("mcp__") || name.includes("__")) actions = [mcpAction(t, name.replace(/^mcp__/, ""))];
      else actions = [{ type: "action", t, kind: "other" }];
      this.classic.push(...actions);
      if (typeof p.call_id === "string") this.pending.set(p.call_id, actions[0]);
      return;
    }
    if ((pt === "function_call_output" || pt === "custom_tool_call_output") && typeof p.call_id === "string") {
      const a = this.pending.get(p.call_id);
      if (!a) return;
      this.pending.delete(p.call_id);
      const out = p.output;
      const meta = parseJson(out)?.metadata;
      const text = typeof out === "string" ? out : "";
      const exit = typeof meta?.exit_code === "number" ? meta.exit_code : /^Exit code: (\d+)/.exec(text.slice(0, 40))?.[1];
      if (exit !== void 0) setOutcome(a, Number(exit) === 0);
      if (ABORT_MARK.test(text.slice(0, 60))) a.interrupted = true;
    }
  }
  item(t, it) {
    switch (it.type) {
      case "UserMessage":
        this.items.push({ type: "prompt", t });
        return;
      case "CommandExecution": {
        const parsed = Array.isArray(it.parsed_cmd) ? it.parsed_cmd : [];
        const a = parsed.length > 0 && parsed.every((c) => typeof c?.type === "string" && EXPLORE_PARSED.has(c.type)) ? { type: "action", t, kind: "explore" } : shellAction(t, it.command, this.files);
        if (typeof it.exit_code === "number") setOutcome(a, it.exit_code === 0);
        if (it.status === "declined") a.denied = true;
        this.items.push(a);
        return;
      }
      case "FileChange": {
        const actions = this.edits(t, it.changes);
        if (it.status === "declined") for (const a of actions) a.denied = true;
        this.items.push(...actions);
        return;
      }
      case "McpToolCall":
        this.items.push(mcpAction(t, `${str(it.server) ?? ""} ${str(it.tool) ?? ""}`));
        return;
      case "SubAgentActivity":
        if (it.kind === "started") this.items.push({ type: "action", t, kind: "subagent" });
        return;
      case "ImageView":
      case "WebSearch":
        this.items.push({ type: "action", t, kind: "explore" });
        return;
      default:
        return;
    }
  }
  trace() {
    const hasItems = this.items.some((e) => e.type !== "interrupt");
    return { agent: "codex", events: hasItems ? this.items : this.classic, models: [...this.models].sort() };
  }
};
async function walk(dir, out, depth = 0) {
  if (depth > 5) return;
  let entries;
  try {
    entries = await readdir2(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = join2(dir, e.name);
    if (e.isDirectory()) await walk(p, out, depth + 1);
    else if (e.isFile() && e.name.endsWith(".jsonl")) {
      try {
        out.push({ file: p, mtime: (await stat2(p)).mtimeMs });
      } catch {
      }
    }
  }
}
async function scanCodexFile(file) {
  const s = { toolCalls: 0, min: Infinity, max: -Infinity };
  const tr = new CodexTrace();
  const rl = createInterface2({ input: createReadStream2(file, { encoding: "utf8" }), crlfDelay: Infinity });
  for await (const line of rl) {
    if (line.length > MAX_LINE2 || line.length < 2) continue;
    const t = TS.exec(line.slice(0, 80));
    if (t) {
      const ms = Date.parse(t[1]);
      if (Number.isFinite(ms)) {
        const sec = Math.floor(ms / 1e3);
        if (sec < s.min) s.min = sec;
        if (sec > s.max) s.max = sec;
      }
    }
    if (!STRUCTURAL.test(line)) continue;
    try {
      const o = JSON.parse(line);
      if (MARKER.test(line)) {
        const ty = typeof o.type === "string" ? o.type : void 0;
        const pty = typeof o.payload?.type === "string" ? o.payload.type : void 0;
        if (ty && TOOL_TYPES.has(ty) || pty && TOOL_TYPES.has(pty)) s.toolCalls++;
      }
      tr.line(o);
    } catch {
    }
  }
  return { ...s, trace: tr.trace() };
}
async function collectCodex(home = homedir2()) {
  try {
    const files = [];
    await walk(join2(home, ".codex", "sessions"), files);
    files.sort((a, b) => b.mtime - a.mtime);
    const newest = files.slice(0, MAX_FILES2);
    if (newest.length === 0) return EMPTY2;
    const signals2 = { detected: true, sessions: 0, toolCalls: 0 };
    const windows = [];
    const traces = [];
    const deadline = Date.now() + BUDGET_MS;
    for (const f of newest) {
      if (Date.now() > deadline) break;
      try {
        const r = await scanCodexFile(f.file);
        traces.push(r.trace);
        signals2.sessions++;
        signals2.toolCalls += r.toolCalls;
        if (Number.isFinite(r.min) && Number.isFinite(r.max)) windows.push({ start: r.min, end: r.max });
      } catch {
      }
    }
    return signals2.sessions === 0 ? EMPTY2 : { signals: signals2, windows, traces };
  } catch {
    return EMPTY2;
  }
}

// packages/cli/src/collectors/cursor.ts
import { execFile as execFile6 } from "node:child_process";
import { readdir as readdir3, stat as stat3 } from "node:fs/promises";
import { homedir as homedir3 } from "node:os";
import { join as join3 } from "node:path";
var DAY_MS = 864e5;
var NONE = { detected: false, sessions: 0, suggestionsShown: 0, suggestionsAccepted: 0 };
function cursorUserDir(home = homedir3(), platform2 = process.platform) {
  switch (platform2) {
    case "darwin":
      return join3(home, "Library", "Application Support", "Cursor", "User");
    case "win32":
      return join3(process.env.APPDATA ?? join3(home, "AppData", "Roaming"), "Cursor", "User");
    default:
      return join3(home, ".config", "Cursor", "User");
  }
}
function run(bin, args, timeout, maxBuffer = 4 * 1024 * 1024) {
  return new Promise((resolve) => {
    execFile6(bin, args, { timeout, maxBuffer }, (err, stdout) => resolve(err ? "" : String(stdout)));
  });
}
async function estimate(db) {
  const out = await run(
    "sqlite3",
    ["-readonly", db, "select key, length(value) from ItemTable where key like '%aiService%' or key like '%composer%'"],
    1500
  );
  let shown = 0;
  let accepted = 0;
  for (const line of out.split("\n")) {
    const len = Number(line.split("|").pop());
    if (!Number.isFinite(len) || line.length === 0) continue;
    shown++;
    if (len > 64) accepted++;
  }
  return { shown, accepted };
}
async function hasBinary() {
  const out = await run(process.platform === "win32" ? "where" : "which", ["sqlite3"], 1e3);
  return out.trim().length > 0;
}
var MAX_COMPOSERS = 200;
var COMPOSER_WINDOW_DAYS = 180;
function composerQuery(cutoffMs, limit = MAX_COMPOSERS) {
  const P = (path2) => `case when json_valid(p) then json_extract(p,'${path2}') end`;
  const R = (path2) => `case when json_valid(r) then json_extract(r,'${path2}') end`;
  return `with c as (
  select json_extract(value,'$.composerId') cid, json_extract(value,'$.createdAt') created,
         json_extract(value,'$.modelConfig.modelName') model, json_extract(value,'$.fullConversationHeadersOnly') headers
  from cursorDiskKV where key >= 'composerData:' and key < 'composerData;' and json_valid(value)
    and json_extract(value,'$.createdAt') >= ${Math.floor(cutoffMs)}
  order by created desc, cid limit ${Math.floor(limit)}
), rows as (
  select c.cid, c.created, c.model, cast(h.key as integer) i, json_extract(h.value,'$.type') ty, b.value v
  from c, json_each(case when json_valid(c.headers) then c.headers else '[]' end) h
  left join cursorDiskKV b on b.key = 'bubbleId:' || c.cid || ':' || json_extract(h.value,'$.bubbleId')
), t as (
  select *, json_extract(v,'$.toolFormerData.params') p, json_extract(v,'$.toolFormerData.result') r
  from rows where v is not null and json_valid(v)
)
select cid c, model m, i, ty, json_extract(v,'$.createdAt') t,
  json_extract(v,'$.toolFormerData.name') n, json_extract(v,'$.toolFormerData.status') s,
  json_extract(v,'$.toolFormerData.userDecision') d,
  ${P("$.command")} cmd,
  coalesce(${P("$.relativeWorkspacePath")}, ${P("$.targetFile")}, ${P("$.target_file")}, ${P("$.filePath")}, ${P("$.file_path")}) f,
  ${R("$.exitCode")} x, ${R("$.rejected")} rj, ${R("$.notInterrupted")} ni,
  ${R("$.beforeContentId")} bc, ${R("$.afterContentId")} ac
from t order by created desc, c, i`;
}
var CURSOR_EDIT = /^(?:edit_file|search_replace|write|apply_patch|delete_file|multi_edit|edit_notebook|reapply|create_file)(?:_v\d+)?$/;
var CURSOR_EXPLORE = /^(?:read_file|grep|grep_search|ripgrep_raw_search|ripgrep_search|glob_file_search|file_search|codebase_search|semantic_search(?:_full)?|list_dir|web_search|web_fetch|read_lints|fetch_rules|fetch_pull_request|deep_search|read_notebook)(?:_v\d+)?$/;
var CURSOR_PLAN = /^(?:todo_write|create_plan|update_plan|plan)(?:_v\d+)?$/;
var CURSOR_SHELL = /^(?:run_terminal_cmd|run_terminal_command)(?:_v\d+)?$/;
var CURSOR_SUBAGENT = /^(?:task|background_composer|spawn_agent)(?:_v\d+)?$/;
function composerTrace(rows) {
  const files = new SessionFiles();
  const events = [];
  const fam = modelFamily(rows[0]?.m ?? null);
  for (const r of rows) {
    const t = toSec(r.t);
    if (r.ty === 1) {
      events.push({ type: "prompt", t });
      continue;
    }
    const name = r.n;
    if (!name) continue;
    let a;
    if (CURSOR_EDIT.test(name)) {
      if (r.f) {
        const target = files.id(r.f);
        const reverts = r.bc && r.ac ? files.edit(target, r.bc, r.ac) : false;
        a = { type: "action", t, kind: "edit", target, ...reverts ? { reverts } : {} };
      } else a = { type: "action", t, kind: "edit" };
    } else if (CURSOR_SHELL.test(name)) {
      a = shellAction(t, r.cmd, files);
      if (typeof r.x === "number") setOutcome(a, r.x === 0);
      else if (r.s === "completed") setOutcome(a, true);
      else if (r.s === "error") setOutcome(a, false);
    } else if (CURSOR_EXPLORE.test(name)) a = { type: "action", t, kind: "explore" };
    else if (CURSOR_PLAN.test(name)) a = { type: "action", t, kind: "plan" };
    else if (CURSOR_SUBAGENT.test(name)) a = { type: "action", t, kind: "subagent" };
    else if (/^ask_question/.test(name)) a = { type: "action", t, kind: "ask" };
    else if (/^mcp[-_]/.test(name)) a = mcpAction(t, name.replace(/^mcp[-_]/, ""));
    else a = { type: "action", t, kind: "other" };
    if (r.rj === 1 || r.d === "rejected") a.denied = true;
    if (r.ni === 0) a.interrupted = true;
    events.push(a);
  }
  return { agent: "cursor", events, models: fam ? [fam] : [] };
}
async function collectComposerTraces(db, now = Date.now()) {
  try {
    await stat3(db);
  } catch {
    return [];
  }
  if (!await hasBinary()) return [];
  const out = await run("sqlite3", ["-readonly", "-json", db, composerQuery(now - COMPOSER_WINDOW_DAYS * DAY_MS)], 8e3, 64 * 1024 * 1024);
  let rows;
  try {
    rows = out.trim() ? JSON.parse(out) : [];
  } catch {
    return [];
  }
  const byComposer = /* @__PURE__ */ new Map();
  for (const r of rows) {
    if (typeof r?.c !== "string") continue;
    const list = byComposer.get(r.c) ?? [];
    list.push(r);
    byComposer.set(r.c, list);
  }
  rows = [];
  return [...byComposer.values()].map((list) => composerTrace(list.sort((a, b) => a.i - b.i))).filter((t) => t.events.length > 0);
}
var MAX_TRANSCRIPTS = 1e3;
var MAX_WINDOW_SEC = 4 * 3600;
async function collectAgentTranscripts(home = homedir3()) {
  const windows = [];
  const root = join3(home, ".cursor", "projects");
  let projects;
  try {
    projects = await readdir3(root, { withFileTypes: true });
  } catch {
    return windows;
  }
  const visit = async (dir, depth) => {
    if (depth > 2 || windows.length >= MAX_TRANSCRIPTS) return;
    let entries;
    try {
      entries = await readdir3(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const p = join3(dir, e.name);
      if (e.isDirectory()) await visit(p, depth + 1);
      else if (e.isFile() && e.name.endsWith(".jsonl") && windows.length < MAX_TRANSCRIPTS) {
        try {
          const s = await stat3(p);
          const end = Math.floor(s.mtimeMs / 1e3);
          const birth = Math.floor(s.birthtimeMs / 1e3);
          windows.push({ start: Math.max(Number.isFinite(birth) && birth > 0 ? birth : end, end - MAX_WINDOW_SEC), end });
        } catch {
        }
      }
    }
  };
  for (const p of projects) if (p.isDirectory()) await visit(join3(root, p.name, "agent-transcripts"), 0);
  return windows;
}
async function collectCursor(home = homedir3(), opts = {}) {
  const userDir = opts.userDir ?? cursorUserDir(home);
  const [windows, base, traces] = await Promise.all([
    collectAgentTranscripts(home),
    collectWorkspaceStorage(join3(userDir, "workspaceStorage")),
    collectComposerTraces(join3(userDir, "globalStorage", "state.vscdb"), opts.now)
  ]);
  const signals2 = {
    detected: base.detected || windows.length > 0,
    sessions: base.sessions + windows.length,
    suggestionsShown: base.suggestionsShown,
    suggestionsAccepted: base.suggestionsAccepted
  };
  return { signals: signals2, windows, traces };
}
async function collectWorkspaceStorage(root) {
  try {
    const entries = await readdir3(root, { withFileTypes: true });
    const cutoff = Date.now() - 180 * DAY_MS;
    const dbs = [];
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const dir = join3(root, e.name);
      try {
        const s = await stat3(dir);
        if (s.mtimeMs < cutoff) continue;
        const db = join3(dir, "state.vscdb");
        await stat3(db);
        dbs.push(db);
      } catch {
      }
    }
    if (dbs.length === 0) return NONE;
    const out = { detected: true, sessions: dbs.length, suggestionsShown: 0, suggestionsAccepted: 0 };
    if (await hasBinary()) {
      const deadline = Date.now() + 3e3;
      for (const db of dbs.slice(0, 60)) {
        if (Date.now() > deadline) break;
        const { shown, accepted } = await estimate(db);
        out.suggestionsShown += shown;
        out.suggestionsAccepted += accepted;
      }
    }
    return out;
  } catch {
    return NONE;
  }
}

// packages/cli/src/collectors/evidence.ts
var SLUG = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
function parseGithubRemote(url) {
  if (!url) return null;
  const u = url.trim();
  let host;
  let path2;
  const scp = /^(?:[^@/]+@)?([^:/]+):(?!\/\/)(.+)$/.exec(u);
  if (/^[a-z+]+:\/\//i.test(u)) {
    try {
      const parsed = new URL(u);
      host = parsed.hostname;
      path2 = parsed.pathname;
    } catch {
      return null;
    }
  } else if (scp) {
    host = scp[1];
    path2 = scp[2];
  } else return null;
  if (host.toLowerCase() !== "github.com") return null;
  const slug2 = path2.replace(/^\/+/, "").replace(/\/+$/, "").replace(/\.git$/, "");
  return SLUG.test(slug2) ? slug2 : null;
}
async function isPublicRepo(slug2, fetchFn = fetch) {
  try {
    const res = await fetchFn(`https://api.github.com/repos/${slug2}`, {
      headers: { "User-Agent": "perfstaq-cli", Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(3e3)
    });
    return res.status === 200;
  } catch {
    return false;
  }
}
async function buildEvidence(repos, opts = {}) {
  const slugs = /* @__PURE__ */ new Map();
  for (const r of repos) {
    const slug2 = parseGithubRemote(r.origin);
    if (!slug2) continue;
    const key = slug2.toLowerCase();
    slugs.set(key, [...slugs.get(key) ?? [], r]);
  }
  const entries = [...slugs.entries()];
  const visible = await Promise.all(entries.map(([key]) => isPublicRepo(key, opts.fetchFn)));
  const all = [];
  const seen = /* @__PURE__ */ new Set();
  entries.forEach(([key, group], i) => {
    if (!visible[i]) return;
    for (const g of group) {
      for (const c of g.commits) {
        if (seen.has(c.sha)) continue;
        seen.add(c.sha);
        all.push({ repo: key, sha: c.sha, additions: c.additions, deletions: c.deletions, ts: c.ts });
      }
    }
  });
  all.sort((a, b) => b.ts - a.ts || a.sha.localeCompare(b.sha));
  const commits = all.slice(0, MAX_EVIDENCE_COMMITS).map(({ repo, sha, additions, deletions }) => ({ repo, sha, additions, deletions }));
  return { commits, publicRepos: new Set(commits.map((c) => c.repo)).size };
}

// packages/cli/src/collectors/git.ts
import { execFile as execFile7 } from "node:child_process";
import { readdir as readdir4, stat as stat4 } from "node:fs/promises";
import { dirname, join as join4 } from "node:path";
var DAY2 = 86400;
var MAX_REPOS = 20;
var MAX_COMMITS_PER_REPO = 2e4;
var REPO_TIMEOUT_MS = 6e4;
var AI_TRAILER = /Co-Authored-By:.*(Claude|Cursor|Copilot)/i;
function git(cwd, args, timeout = 8e3) {
  return new Promise((resolve) => {
    execFile7(
      "git",
      args,
      { cwd, timeout, maxBuffer: 128 * 1024 * 1024, env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" } },
      (err, stdout) => resolve(err ? "" : String(stdout))
    );
  });
}
async function repoRoot(cwd) {
  const out = (await git(cwd, ["rev-parse", "--show-toplevel"], 3e3)).trim();
  return out || null;
}
function resolveRename(p) {
  if (!p.includes(" => ")) return p;
  const braced = p.replace(/\{([^{}]*) => ([^{}]*)\}/, (_m, _a, b) => b).replace(/\/\//g, "/");
  if (braced !== p) return braced;
  return p.split(" => ").pop() ?? p;
}
function parseLog(out) {
  const commits = [];
  for (const rec of out.split("")) {
    if (!rec.trim()) continue;
    const parts = rec.split("");
    if (parts.length < 6) continue;
    const ts = Number(parts[1]);
    const sha = (parts[0] ?? "").trim();
    if (!Number.isFinite(ts) || !/^[0-9a-f]{40}$/.test(sha)) continue;
    const files = [];
    let additions = 0;
    let deletions = 0;
    for (const line of (parts[5] ?? "").split("\n")) {
      const m = /^(\d+|-)\t(\d+|-)\t(.+)$/.exec(line);
      if (!m) continue;
      if (m[1] === "-" || m[2] === "-") continue;
      const added = Number(m[1]);
      const deleted = Number(m[2]);
      additions += added;
      deletions += deleted;
      files.push({ path: resolveRename(m[3]), added, deleted });
    }
    commits.push({ sha, email: (parts[2] ?? "").trim().toLowerCase(), additions, deletions, ts, subject: parts[3] ?? "", body: parts[4] ?? "", files });
  }
  return commits;
}
async function readRepo(dir) {
  const out = await git(
    dir,
    [
      "log",
      "--numstat",
      "--no-color",
      "--no-merges",
      "-n",
      String(MAX_COMMITS_PER_REPO),
      "--pretty=format:%x1e%H%x1f%at%x1f%ae%x1f%s%x1f%b%x1f"
    ],
    REPO_TIMEOUT_MS
  );
  return parseLog(out);
}
async function configuredEmails(cwd) {
  const out = await git(cwd, ["config", "--get-all", "user.email"], 3e3);
  return out.split("\n").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
async function originUrl(dir) {
  const out = (await git(dir, ["remote", "get-url", "origin"], 3e3)).trim();
  return out || null;
}
function anonymise(raw, windows) {
  const sorted = [...raw].reverse().sort((a, b) => a.ts - b.ts);
  const index = /* @__PURE__ */ new Map();
  sorted.forEach((c, idx) => {
    for (const f of c.files) {
      if (isBoilerplatePath(f.path) || f.deleted === 0) continue;
      let e = index.get(f.path);
      if (!e) {
        e = { idx: [], ts: [], prefix: [0] };
        index.set(f.path, e);
      }
      e.idx.push(idx);
      e.ts.push(c.ts);
      e.prefix.push(e.prefix[e.prefix.length - 1] + f.deleted);
    }
  });
  const upper = (arr, x) => {
    let lo = 0;
    let hi = arr.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (arr[mid] <= x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };
  const result = [];
  sorted.forEach((c, i) => {
    const files = [];
    let churned = 0;
    for (const f of c.files) {
      if (isBoilerplatePath(f.path)) continue;
      const lang = languageFromPath(f.path);
      if (!lang) continue;
      const file = {
        language: lang.language,
        added: f.added,
        deleted: f.deleted,
        isTest: isTestPath(f.path),
        depth: pathDepth(f.path)
      };
      if (lang.framework) file.framework = lang.framework;
      files.push(file);
      if (f.added > 0) {
        const e = index.get(f.path);
        if (e) {
          const lo = upper(e.idx, i);
          const hi = upper(e.ts, c.ts + DAY2);
          const later = hi > lo ? e.prefix[hi] - e.prefix[lo] : 0;
          churned += Math.min(f.added, later);
        }
      }
    }
    const isRevert = c.subject.startsWith('Revert "') || c.body.includes("This reverts commit");
    const text = `${c.subject}
${c.body}`;
    const aiAssisted = AI_TRAILER.test(text) || text.includes("Generated with [Claude Code]") || windows.some((w) => c.ts >= w.start && c.ts <= w.end);
    result.push({ timestamp: c.ts, isRevert, aiAssisted, churnedLines24h: churned, files });
  });
  return result;
}
async function siblingRepos(root) {
  const parent = dirname(root);
  const found = [];
  try {
    const names = (await readdir4(parent)).sort();
    for (const n of names) {
      if (found.length >= MAX_REPOS - 1) break;
      const dir = join4(parent, n);
      if (dir === root) continue;
      try {
        if ((await stat4(join4(dir, ".git"))).isDirectory() || (await stat4(join4(dir, ".git"))).isFile()) found.push(dir);
      } catch {
      }
    }
  } catch {
  }
  return found;
}
var SKIP_DIRS = /* @__PURE__ */ new Set(["node_modules", "Library", "Applications", "Pictures", "Music", "Movies", "Downloads", "dist", "build", "vendor", ".Trash"]);
async function isRepo(dir) {
  try {
    await stat4(join4(dir, ".git"));
    return true;
  } catch {
    return false;
  }
}
async function childRepos(dir, depth = 2) {
  const found = [];
  const walk2 = async (d, left) => {
    if (found.length >= MAX_REPOS || left < 0) return;
    let names;
    try {
      names = (await readdir4(d)).sort();
    } catch {
      return;
    }
    for (const n of names) {
      if (found.length >= MAX_REPOS) return;
      if (n.startsWith(".") || SKIP_DIRS.has(n)) continue;
      const sub = join4(d, n);
      try {
        if (!(await stat4(sub)).isDirectory()) continue;
      } catch {
        continue;
      }
      if (await isRepo(sub)) found.push(sub);
      else await walk2(sub, left - 1);
    }
  };
  await walk2(dir, depth - 1);
  return found;
}
var UNIDENTIFIED_WARNING = "We couldn't tell which changes are yours, so we counted all of them. Fix: run  git config --global user.email you@example.com  (the email you use on GitHub), then scan again.";
var EMPTY3 = { commits: [], reposAnalyzed: 0, repos: [], unidentified: false, emails: [], reposFound: 0, mode: "folder" };
async function collectGit(opts) {
  try {
    const root = await repoRoot(opts.cwd);
    const mode = root ? "project" : "folder";
    const repos = root ? [root] : await childRepos(opts.cwd);
    if (root && opts.all) repos.push(...await siblingRepos(root));
    if (repos.length === 0) return EMPTY3;
    const emailSet = new Set((opts.emails ?? []).map((e) => e.trim().toLowerCase()).filter(Boolean));
    const cfg = await Promise.all(repos.map((r) => configuredEmails(r)));
    for (const list of cfg) for (const e of list) emailSet.add(e);
    const unidentified = emailSet.size === 0;
    const lists = await Promise.all(
      repos.map(async (r) => {
        try {
          return { dir: r, raw: await readRepo(r), origin: await originUrl(r) };
        } catch {
          return { dir: r, raw: [], origin: null };
        }
      })
    );
    const commits = [];
    const repoScans = [];
    let reposAnalyzed = 0;
    for (const { dir, raw, origin } of lists) {
      const own = unidentified ? raw : raw.filter((c) => emailSet.has(c.email));
      if (own.length === 0) continue;
      reposAnalyzed++;
      commits.push(...anonymise(own, opts.windows));
      repoScans.push({
        dir,
        origin,
        commits: own.map((c) => ({ sha: c.sha, ts: c.ts, additions: c.additions, deletions: c.deletions }))
      });
    }
    commits.sort((a, b) => a.timestamp - b.timestamp);
    return { commits, reposAnalyzed, repos: repoScans, unidentified, emails: [...emailSet].sort(), reposFound: repos.length, mode };
  } catch {
    return EMPTY3;
  }
}

// packages/cli/src/machine.ts
import { randomBytes as randomBytes2 } from "node:crypto";
import { chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir as homedir4 } from "node:os";
import { join as join5 } from "node:path";
async function machineFingerprint() {
  const dir = join5(homedir4(), ".perfstaq");
  const file = join5(dir, "salt");
  let salt = null;
  try {
    salt = (await readFile(file, "utf8")).trim();
    if (!salt) salt = null;
  } catch {
    salt = null;
  }
  if (!salt) {
    salt = randomBytes2(32).toString("hex");
    try {
      await mkdir(dir, { recursive: true, mode: 448 });
      await writeFile(file, salt + "\n", { mode: 384 });
      await chmod(file, 384).catch(() => void 0);
    } catch {
    }
  }
  return sha256Hex(salt);
}

// packages/cli/src/render.ts
var ORANGE = source_default.hex("#ff6a1a");
var fmt2 = (n) => n.toLocaleString("en-US");
var W = 58;
var NOTHING_SENT = "Nothing has left this computer. Your code, file names and AI chats are never sent.";
function header() {
  return [
    "",
    `${ORANGE.bold(">_ perfstaq")}  ${source_default.dim("turns your real coding work into a profile people can trust")}`,
    ""
  ].join("\n");
}
function step(n, total, title) {
  return `
${ORANGE.bold(`Step ${n} of ${total}`)}  ${source_default.bold(title)}`;
}
var ok = (s) => `  ${source_default.green("\u2713")} ${s}`;
var note = (s) => `  ${source_default.dim(s)}`;
var warn = (s) => `  ${source_default.yellow("!")} ${s}`;
var bad = (s) => `  ${source_default.red("\u2717")} ${s}`;
function meter(value, max, width = 20) {
  const n = Math.max(0, Math.min(width, Math.round(value / max * width)));
  return ORANGE("\u2588".repeat(n)) + source_default.dim("\u2591".repeat(width - n));
}
var VALUE_W = W - 21;
function fitList(items, width = VALUE_W) {
  let out = "";
  for (const it of items) {
    const next = out ? `${out}, ${it}` : it;
    if (next.length > width) break;
    out = next;
  }
  return out || (items[0] ?? "").slice(0, width);
}
function wrap(text, width = VALUE_W) {
  const lines = [];
  let cur = "";
  for (const w of text.split(/\s+/)) {
    if (cur && `${cur} ${w}`.length > width) {
      lines.push(cur);
      cur = w;
    } else cur = cur ? `${cur} ${w}` : w;
  }
  if (cur) lines.push(cur);
  return lines;
}
function boxed(lines, title) {
  const top = source_default.dim(`\u250C\u2500 ${title} ${"\u2500".repeat(Math.max(0, W - title.length - 3))}\u2510`);
  const body = lines.map(([s, p]) => `${source_default.dim("\u2502")} ${s}${" ".repeat(Math.max(0, W - p.length - 1))}${source_default.dim("\u2502")}`);
  return [top, ...body, source_default.dim(`\u2514${"\u2500".repeat(W)}\u2518`)].join("\n");
}
function renderSummary(p) {
  const L = [];
  const add = (label, value, styledValue = value) => L.push([`${source_default.dim(label.padEnd(20))}${styledValue}`, `${label.padEnd(20)}${value}`]);
  const blank = () => L.push(["", ""]);
  const score = `${p.overallScore} out of 1000`;
  L.push([`${source_default.bold("Your score".padEnd(20))}${ORANGE.bold(score.padEnd(17))}${meter(p.overallScore, 1e3, 18)}`, `${"Your score".padEnd(20)}${score.padEnd(17)}${"x".repeat(18)}`]);
  blank();
  const parts = [
    ["  Careful work", p.subScores.rigor],
    ["  AI code you kept", p.subScores.aiSurvival],
    ["  Range of skills", p.subScores.stackComplexity]
  ];
  for (const [label, v] of parts) {
    const num = String(v).padStart(4);
    L.push([`${source_default.dim(label.padEnd(20))}${num}  ${meter(v, 1e3, 18)}`, `${label.padEnd(20)}${num}  ${"x".repeat(18)}`]);
  }
  blank();
  const langs = p.languageTimeline.slice(0, 3).map((t2) => {
    const yrs = yearsBetween(t2.firstCommitAt, t2.lastCommitAt);
    return `${t2.language} (${yrs >= 1 ? `${yrs} yrs` : `${t2.activeMonths} mo`})`;
  });
  add("You code in", langs.length ? fitList(langs) : "\u2014");
  const t = p.aiToolsDetected;
  const tools = [t.claudeCode && "Claude Code", t.cursor && "Cursor", t.codex && "Codex"].filter(Boolean).join(", ");
  add("AI helpers", tools || "none found");
  const info = archetypeInfo(p.archetype);
  add("Your style", p.archetype, source_default.bold(p.archetype));
  for (const t2 of wrap(info.tagline)) L.push([source_default.dim(`${" ".repeat(20)}${t2}`), `${" ".repeat(20)}${t2}`]);
  const cards = deriveAchievements(p, { tier: "self-reported" }).length;
  add("Cards earned", `${cards} shareable cards`);
  return [boxed(L, "Your coding profile"), "", `  ${source_default.green(NOTHING_SENT)}`].join("\n");
}
function renderFound(opts) {
  const out = [];
  out.push(ok(opts.mode === "project" ? "Found your project" : `Found ${opts.projects} project${opts.projects === 1 ? "" : "s"} in this folder`));
  out.push(ok(`${fmt2(opts.commits)} changes you saved with git`));
  const used = Object.entries(opts.sessions).filter(([, n]) => n > 0);
  if (used.length) out.push(ok(`AI helpers you use: ${used.map(([k, n]) => `${k} (${fmt2(n)} sessions)`).join(", ")}`));
  else out.push(note("No AI helpers found (Claude Code, Cursor, Codex). That is fine."));
  return out;
}
function renderNothingFound(mode, projects) {
  const lines = [
    "",
    bad(projects > 0 ? "Found projects here, but none of the changes in them are yours." : "We couldn't find any of your code here."),
    "",
    note("Perfstaq needs to run in the folder where your projects are."),
    note('For example, if your projects are in a folder called "code":'),
    "",
    `      ${ORANGE("cd ~/code")}`,
    `      ${ORANGE("npx perfstaq scan")}`,
    ""
  ];
  if (projects > 0) {
    lines.push(note("If they are yours, git may know you by another email. Tell us which one:"));
    lines.push(`      ${ORANGE("npx perfstaq scan --email you@example.com")}`);
    lines.push("");
  }
  lines.push(note("Nothing was sent anywhere."));
  return lines.join("\n");
}
function explainNotVerified(opts) {
  const f = opts.flags;
  if (!opts.shared) return ["you chose not to let us check your GitHub work.", "Run the scan again and answer yes to the check."];
  if (opts.checkFailed || f.includes("github-unavailable")) return ["GitHub didn't answer while we were checking.", "Nothing is wrong. Run the scan again tomorrow."];
  if (opts.publicCommits === 0) return ["none of your projects here are public on GitHub, so nobody can check them.", "Put at least one project on GitHub as public, then scan again."];
  if (f.includes("commit-not-found")) return ["some of your work isn't on GitHub yet.", "Push your latest changes to GitHub (git push), then scan again tomorrow."];
  if (f.includes("commit-mismatch")) return ["some of the work we checked doesn't belong to your GitHub account.", "Make sure git uses the same email as your GitHub account, then scan again tomorrow."];
  if (f.includes("low-evidence-coverage")) return ["most of your work is private, so we could only check a small part.", "Make a few more of your projects public on GitHub, then scan again tomorrow."];
  if (f.includes("evidence-inconsistent")) return ["the numbers from this scan didn't add up.", "Scan again tomorrow with the latest version: npx perfstaq@latest scan"];
  return ["we couldn't confirm enough of your work.", "Make sure your projects are public on GitHub, then scan again tomorrow."];
}
function candidateHeader(candidateId, kind = "sandbox") {
  return ["", `${source_default.bold("B55 application")} ${source_default.dim(candidateId)}  ${source_default.dim(`\xB7 ${kind === "live" ? "live" : "sandbox"} \xB7 powered by Perfstaq`)}`, ""].join("\n");
}
var FAMILY_WORDS = {
  "claude-opus": "Claude Opus",
  "claude-sonnet": "Claude Sonnet",
  "claude-haiku": "Claude Haiku",
  "claude-other": "other Claude",
  "gpt-4": "GPT-4",
  "gpt-5": "GPT-5",
  "gpt-6": "GPT-6",
  "gpt-other": "other GPT",
  "openai-o": "OpenAI o-series",
  gemini: "Gemini",
  cursor: "Cursor models",
  other: "other models"
};
var MCP_WORDS = {
  browser: "browser",
  "code-host": "code hosting",
  docs: "docs and search",
  database: "database",
  cloud: "cloud",
  issues: "issue tracker",
  chat: "chat and email",
  memory: "memory",
  design: "design",
  other: "other"
};
var of = (n, d) => `${fmt2(n)} of ${fmt2(d)}`;
var mins = (m) => m === null ? "unknown" : m < 1 ? "under a minute" : `${Math.round(m)} min`;
function sessionLines(a) {
  if (a.sessions === 0) return [ok("How you work with AI agents: no sessions found, so only that zero is sent")];
  const p = a.planning;
  const v = a.verification;
  const st = a.steering;
  const kept = a.edits.total - a.edits.undone;
  const fams = Object.keys(a.models).map((k) => FAMILY_WORDS[k]);
  const kinds = Object.entries(a.mcp).map(([k, n]) => `${MCP_WORDS[k]} ${fmt2(n ?? 0)}`);
  const out = [
    ok(`How you work with AI agents, as counts from ${fmt2(a.sessions)} sessions on ${fmt2(a.activeDays)} days:`),
    `      ${source_default.dim("\xB7")} looked around before the first edit in ${of(p.exploreFirst, p.sessionsWithEdits)} sessions with edits`,
    `      ${source_default.dim("\xB7")} ran tests, builds or linters after editing in ${of(v.sessionsChecking, p.sessionsWithEdits)}`,
    `      ${source_default.dim("\xB7")} runs: ${fmt2(v.runs.test)} test, ${fmt2(v.runs.build)} build, ${fmt2(v.runs.lint)} lint; ${fmt2(v.failingRuns)} failed, ${fmt2(v.fixLoops)} fix-and-rerun loops`,
    `      ${source_default.dim("\xB7")} sessions with a failing run that ended passing: ${of(a.recovery.endedGreen, a.recovery.sessionsWithFailures)}`,
    `      ${source_default.dim("\xB7")} you corrected the agent ${fmt2(st.corrections)} times, stopped it ${fmt2(st.interrupts)}, said no ${fmt2(st.denials)}`,
    `      ${source_default.dim("\xB7")} agent edits kept: ${of(kept, a.edits.total)} (${fmt2(a.edits.reworked)} redone after a correction)`,
    `      ${source_default.dim("\xB7")} a typical session: ${mins(a.depth.minutes.p50)}, ${fmt2(a.depth.toolCalls.p50 ?? 0)} tool calls, ${fmt2(a.depth.turns.p50 ?? 0)} prompts; ${fmt2(a.subagents.sessionsUsing)} used helper agents`
  ];
  if (fams.length) out.push(`      ${source_default.dim("\xB7")} model families: ${fitList(fams, 46)}`);
  if (kinds.length) out.push(`      ${source_default.dim("\xB7")} MCP tool calls by kind: ${fitList(kinds, 50)}`);
  return out;
}
function renderCandidateShare(p, demo, publicCommitIds = 0) {
  const langs = p.stackBreakdown.slice(0, 5).map((s) => `${s.language} ${s.percentage}%`);
  const t = p.aiToolsDetected;
  const tools = [t.claudeCode && "Claude Code", t.cursor && "Cursor", t.codex && "Codex"].filter(Boolean).join(", ") || "none found";
  const out = [
    `  ${source_default.bold("What will be sent, and nothing else:")}`,
    ok(`Languages: ${langs.length ? fitList(langs, 46) : "none"} (with first and last dates)`),
    ok(`How many changes you saved (${fmt2(p.commitsAnalyzed)}) in how many projects (${fmt2(p.reposAnalyzed)})`),
    ok("Your scores, test share, how often you undo changes, how much AI code you kept"),
    ok(`How many AI sessions you ran (${fmt2(p.aiMetrics.agentSessionsAnalyzed)}, counts only) and which helpers: ${tools}`),
    ...p.sessionAnalysis ? sessionLines(p.sessionAnalysis) : [],
    ok("A seal that shows if anyone changes these numbers later"),
    ...publicCommitIds > 0 ? [ok(`${fmt2(publicCommitIds)} commit IDs from your PUBLIC GitHub repos, only so B55 can check they are yours`)] : [],
    note("Never sent: your code, file or folder names, commit messages, AI chats or prompts, the commands"),
    note(
      publicCommitIds > 0 ? "you or the agent ran, what the AI wrote back, MCP server names, or commit IDs from private projects." : "you or the agent ran, what the AI wrote back, MCP server names, or GitHub commit IDs."
    )
  ];
  if (demo) out.push(note("Demo mode: this is sample data, not your work."));
  return out;
}

// packages/cli/src/version.ts
var CLI_VERSION = "0.4.2";

// packages/cli/src/scan.ts
async function ask(q, byDefault = true) {
  const rl = createInterface3({ input: process.stdin, output: process.stdout });
  try {
    const a = (await rl.question(q)).trim().toLowerCase();
    return a === "" ? byDefault : a === "y" || a === "yes";
  } finally {
    rl.close();
  }
}
async function runScan(opts) {
  const api = (process.env.PERFSTAQ_API_URL ?? opts.api).replace(/\/+$/, "");
  const quiet = Boolean(opts.json || opts.dryRun);
  const say = (s = "") => {
    if (!quiet) console.log(s);
  };
  const interactive = Boolean(process.stdin.isTTY && process.stdout.isTTY);
  const key = (opts.key ?? process.env.PERFSTAQ_KEY ?? "").trim() || null;
  if (key && !/^pq_[A-Za-z0-9_-]{32,64}$/.test(key)) {
    say(bad("That key looks wrong. Copy your command again from perfstaq.com/start."));
    process.exitCode = 1;
    return;
  }
  const ref = opts.candidate ? parseCandidate(opts.candidate) : null;
  let base = "";
  if (opts.candidate) {
    const problem = !ref ? `"${opts.candidate.slice(0, 24)}\u2026" is not a candidate command. Copy it again from the apply page.` : key || opts.json || opts.upload === false ? "--candidate cannot be combined with --key, --json or --no-upload (use --dry-run to see what would be sent)." : ref.kind === "live" && opts.demo ? "--demo only works with the sandbox. Run the command from the apply page without --demo." : ref.kind === "live" && ref.exp * 1e3 < Date.now() ? "This command expired. Get a new one from the apply page." : null;
    try {
      base = apiBase(opts.url ?? opts.sandboxUrl, ref?.kind ?? "sandbox");
    } catch (e) {
      if (!(e instanceof CandidateScanError)) throw e;
      console.log(bad(problem ?? e.message));
      process.exitCode = 1;
      return;
    }
    if (problem) {
      console.log(bad(problem));
      process.exitCode = 1;
      return;
    }
  }
  const candidate = ref;
  say(ref ? candidateHeader(ref.id, ref.kind) : header());
  say(step(1, key || candidate ? 2 : 3, "Looking at your work on this computer"));
  const canSpin = !quiet && Boolean(process.stderr.isTTY) && (process.stderr.columns ?? 0) >= 20;
  const spinner = canSpin ? ora({ text: "Reading your projects\u2026", stream: process.stderr, indent: 2 }).start() : null;
  let input;
  let fingerprint;
  let gitResult = null;
  let sessions = {};
  if (opts.demo) {
    input = demoScanInput();
    fingerprint = DEMO_MACHINE_FINGERPRINT;
  } else {
    const [claude, cursor, codex] = await Promise.all([collectClaude(), collectCursor(), collectCodex()]);
    const windows = [...claude.windows, ...cursor.windows, ...codex.windows];
    gitResult = await collectGit({ cwd: process.cwd(), all: Boolean(opts.all), windows, emails: opts.email });
    input = {
      commits: gitResult.commits,
      reposAnalyzed: gitResult.reposAnalyzed,
      now: Math.floor(Date.now() / 1e3),
      ai: { claudeCode: claude.signals, cursor: cursor.signals, codex: codex.signals },
      // Reduced to aggregate numbers here, on this computer. The traces themselves are dropped with this scope.
      sessionAnalysis: analyseSessions([...claude.traces, ...cursor.traces, ...codex.traces])
    };
    sessions = { "Claude Code": claude.signals.sessions, Cursor: cursor.signals.sessions, Codex: codex.signals.sessions };
    fingerprint = await machineFingerprint();
  }
  const meta = { cliVersion: CLI_VERSION, machineFingerprint: fingerprint };
  const previewMeta = ref?.kind === "live" ? { ...meta, evidence: { nonce: ref.jti, commits: [] } } : meta;
  if (!candidate && !opts.json && !opts.dryRun) input = { ...input, sessionAnalysis: void 0 };
  const unsigned = computeScan(input, previewMeta);
  const payload = await signPayload(candidate ? stampForUpload(unsigned) : unsigned);
  spinner?.stop();
  if (opts.json || opts.dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    if (opts.dryRun) console.error(note("Dry run: this is exactly what would be sent. Nothing was sent."));
    return;
  }
  if (!opts.demo && input.commits.length === 0) {
    say(renderNothingFound(gitResult?.mode ?? "folder", gitResult?.reposFound ?? 0));
    process.exitCode = 1;
    return;
  }
  if (opts.demo) say(note("Demo mode: this is sample data, not your work."));
  else
    for (const l of renderFound({
      projects: gitResult?.reposAnalyzed ?? 0,
      commits: input.commits.length,
      mode: gitResult?.mode ?? "project",
      sessions
    }))
      say(l);
  if (gitResult?.unidentified) say(warn(UNIDENTIFIED_WARNING));
  say("");
  say(renderSummary(payload));
  if (ref) {
    await sendForCandidate({ ref, base, input, meta, gitResult, demo: Boolean(opts.demo), yes: Boolean(opts.yes), interactive, evidence: opts.evidence });
    return;
  }
  if (opts.demo) {
    say("");
    say(note("That was a demo. To see your own profile, run this in the folder with your projects:"));
    say(`      npx perfstaq scan`);
    say("");
    return;
  }
  if (opts.upload === false || !interactive && !opts.yes && !key) {
    say("");
    say(note("Want a public profile and shareable cards? Run  npx perfstaq scan  again and say yes."));
    say("");
    return;
  }
  if (!key) {
    say(step(2, 3, "Make it a public profile? (optional)"));
    say(note("You get a page like perfstaq.com/u/yourname and cards you can post on LinkedIn, X or Instagram."));
    say(note("Only your scores are sent. Never your code, file names or AI chats."));
    say("");
  }
  if (!key && !opts.yes && !await ask("  Make my profile? (Y/n) ")) {
    say("");
    say(note("No problem. Nothing was sent."));
    say("");
    return;
  }
  try {
    say("");
    let auth;
    if (key) {
      auth = { token: key, username: "" };
    } else {
      say(note('A browser window will open. Sign in with GitHub, then click "Yes, this is me".'));
      auth = await browserLogin(api, (url2) => {
        say(note("If nothing opens, copy this link into your browser:"));
        say(`      ${url2}`);
        say("");
      });
      say(ok(`Signed in as @${auth.username}`));
    }
    if (!key && interactive && !opts.yes && !await ask(`  Is @${auth.username} your GitHub account? (Y/n) `)) {
      say("");
      say(note("Then let's use yours. In your browser, sign out of GitHub (github.com \u2192 your picture \u2192 Sign out),"));
      say(note("then run  npx perfstaq scan  again and sign in with your own account. Nothing was saved."));
      say("");
      return;
    }
    let share = opts.evidence;
    if (share === void 0 && key) share = true;
    if (share === void 0 && interactive) {
      say("");
      say(note("Want the \u2713 Verified badge? We look up a few of your PUBLIC GitHub changes to confirm they are really yours."));
      say(note("Private projects are never checked or shared."));
    }
    if (share === void 0 && !interactive) share = false;
    if (share === void 0) share = await ask("  Check my public work? (Y/n) ");
    if (share && gitResult?.unidentified) {
      say(warn("Skipping the check: we couldn't tell which changes are yours (see the tip above)."));
      share = false;
    }
    say(key ? step(2, 2, "Saving your profile") : step(3, 3, "Saving your profile"));
    let evidence = { nonce: null, commits: [] };
    let checkFailed = false;
    let publicCommits = 0;
    if (share && gitResult) {
      const built = await buildEvidence(gitResult.repos);
      publicCommits = built.commits.length;
      try {
        const { nonce } = await fetchNonce(api, auth.token);
        evidence = { nonce, commits: built.commits };
      } catch (e) {
        if (e instanceof ApiError && e.status === 429) throw e;
        checkFailed = true;
      }
    } else {
      evidence = { nonce: (await fetchNonce(api, auth.token)).nonce, commits: [] };
    }
    const finalPayload = await signPayload(computeScan(input, { ...meta, evidence }));
    const saving = share ? "Saving and checking your work on GitHub\u2026" : "Saving\u2026";
    const up = canSpin ? ora({ text: saving, stream: process.stderr, indent: 2 }).start() : null;
    if (!up) say(note(saving));
    const r = await uploadScan(api, auth.token, finalPayload);
    up?.stop();
    const url = r.profileUrl ?? `${api}/u/${auth.username}`;
    const tier = r.trustTier ?? "self-reported";
    say(ok(source_default.bold("Done! Your profile is live.")));
    say("");
    say(`  ${source_default.dim("Your profile".padEnd(14))}${source_default.bold(url)}`);
    if (tier === "self-reported") {
      const [why, fix] = explainNotVerified({ shared: Boolean(share), checkFailed, publicCommits, flags: r.flags ?? [] });
      say(`  ${source_default.dim("Badge".padEnd(14))}${source_default.yellow("Not verified yet")} ${source_default.dim("(you won't show on the leaderboard until you are)")}`);
      say(`  ${source_default.dim("Why".padEnd(14))}${why}`);
      say(`  ${source_default.dim("To fix".padEnd(14))}${fix}`);
    } else {
      say(`  ${source_default.dim("Badge".padEnd(14))}${source_default.green(tier === "signed" ? "\u2713 Verified and signed" : "\u2713 Verified")} ${source_default.dim("(we checked your work on GitHub)")}`);
      if (typeof r.topPercent === "number") say(`  ${source_default.dim("Standing".padEnd(14))}${source_default.bold(`Top ${r.topPercent}%`)} of verified developers on Perfstaq`);
    }
    say("");
    if (key) {
      say(note("Your perfstaq.com tab is switching to your profile now. Click any card to share it."));
      say("");
    } else {
      say(note("Opening your profile now. Click any card to share it on LinkedIn, X or Instagram."));
      say("");
      if (process.env.PERFSTAQ_NO_OPEN !== "1") open_default(url).catch(() => void 0);
    }
  } catch (e) {
    say("");
    say(bad(friendly(e)));
    say("");
    process.exitCode = 1;
  }
}
async function sendForCandidate(o) {
  let commits = [];
  if (o.ref.kind === "live" && !o.demo) {
    let share = o.evidence;
    if (share === void 0 && o.interactive && !o.yes) {
      console.log(note("B55 can check a few of your PUBLIC GitHub commits to confirm they are really yours (the \u201Cverified\u201D badge)."));
      console.log(note("Only commit IDs from public repos are sent. Private projects are never checked or shared."));
      share = await ask("  Check my public work? (Y/n) ");
    }
    if (share && o.gitResult?.unidentified) {
      console.log(warn("Skipping the check: we couldn't tell which commits are yours (see the tip above)."));
      share = false;
    }
    if (share && o.gitResult) commits = (await buildEvidence(o.gitResult.repos)).commits;
  }
  const evidence = { nonce: o.ref.kind === "live" ? o.ref.jti : null, commits };
  const payload = await signPayload(stampForUpload(computeScan(o.input, { ...o.meta, evidence })));
  console.log(step(2, 2, "Send it to the company? (you decide)"));
  for (const l of renderCandidateShare(payload, o.demo, commits.length)) console.log(l);
  console.log(`  ${source_default.dim("Sending to".padEnd(18))}${new URL(o.base).host}`);
  console.log("");
  if (!o.yes) {
    if (!o.interactive) {
      console.log(note("Nothing was sent. Run it in a terminal to answer the question, or add --yes to send without asking."));
      process.exitCode = 1;
      return;
    }
    if (!await ask(`  Send this for application ${o.ref.id}? (y/N) `, false)) {
      console.log(note("No problem. Nothing was sent."));
      return;
    }
  }
  const spin = process.stderr.isTTY ? ora({ text: commits.length > 0 ? "Sending and checking your public commits on GitHub\u2026" : "Sending\u2026", stream: process.stderr, indent: 2 }).start() : null;
  try {
    const r = await sendCandidateScan(o.base, o.ref, payload);
    spin?.stop();
    const verdict = r.verdict ? ` Result: ${r.verdict.replace(/-/g, " ")}.` : "";
    console.log(ok(source_default.bold(r.status === "insufficient_evidence" ? "Sent. There was not enough history to assess, and the report says so." : `Sent. The report is ready.${verdict}`)));
    console.log("");
    if (o.ref.kind === "sandbox") {
      console.log(`  ${source_default.dim("Recruiter view".padEnd(16))}${consoleOrigin(o.base)}/jobs/${encodeURIComponent(r.job_id)}/candidates/${encodeURIComponent(r.id)}`);
      console.log(note("Sandbox: nothing was checked on GitHub, so every number is marked self-reported."));
    } else {
      console.log(`  ${source_default.dim("Your report".padEnd(16))}${consoleOrigin(o.base)}/me`);
      console.log(note("You can see your report, download your data or withdraw at any time from that page."));
    }
    console.log(note('Your apply page switches to "Done" by itself.'));
    console.log("");
  } catch (e) {
    spin?.stop();
    if (!(e instanceof CandidateScanError)) throw e;
    console.log(bad(explainCandidateError(e, o.ref, o.base)));
    console.log("");
    process.exitCode = 1;
  }
}
function friendly(e) {
  if (e instanceof ApiError) {
    if (e.status === 401) return e.detail || "Your sign-in expired. Get a fresh command at perfstaq.com/start.";
    if (e.status === 429) {
      const iso = /\d{4}-\d{2}-\d{2}T[\d:.]+Z/.exec(e.message)?.[0];
      const when = iso ? new Date(iso).toLocaleString([], { weekday: "short", hour: "numeric", minute: "2-digit" }) : "tomorrow";
      return `You can update your profile once a day. Try again after ${when}.`;
    }
    if (e.status === 409) return "This exact scan was already saved. Your profile is up to date.";
    if (e.status === 403) return e.detail || "This GitHub account is not allowed to save this profile.";
    if (e.status === 422 || e.status === 400) return e.detail || "Perfstaq could not read this scan. Update and try again:  npx perfstaq@latest scan";
    if (e.status >= 500) return "Perfstaq is having trouble right now. Nothing was lost; try again in a few minutes.";
  }
  const m = e.message ?? "";
  if (/Timed out waiting/.test(m)) return "We stopped waiting for the browser. Run  npx perfstaq scan  again when you are ready.";
  if (/reach|fetch failed|ENOTFOUND|ECONN/i.test(m)) return "Couldn't reach Perfstaq. Check your internet and try again.";
  return m || "Something went wrong. Run  npx perfstaq scan  again.";
}

// packages/cli/src/b55-main.ts
var program2 = new Command();
program2.name("b55").description("Send a privacy-safe summary of your coding work to a company you applied to through B55. Your code never leaves your computer.").version(CLI_VERSION);
program2.command("scan").description("Scan this folder (or --all sibling repos) and, if you agree, send the summary for your application").requiredOption("--candidate <token>", "the token from your apply page (b55ct_\u2026)").option("--url <url>", "B55 API base URL", process.env.B55_URL ?? DEFAULT_LIVE_URL).option("--all", "also scan sibling git repos of the current repo").option("--evidence", "share commit IDs from public GitHub repos for verification (skips the question)").option("--no-evidence", "do not share commit IDs (the report stays self-reported)").option("--email <addr>", "a git author email that is yours (repeatable)", (v, prev = []) => [...prev, v]).option("-y, --yes", "send without asking (needed when not in a terminal)").option("--dry-run", "print exactly what would be sent and send nothing").option("--demo", "sample data (sandbox candidates only)").action(async (o) => {
  try {
    await runScan({ candidate: o.candidate, url: o.url, all: o.all, evidence: o.evidence, email: o.email, yes: o.yes, demo: o.demo, dryRun: o.dryRun, api: "https://perfstaq.com" });
  } catch (e) {
    console.error(source_default.red(`  \u2717 ${friendly(e)}`));
    process.exitCode = 1;
  }
});
program2.parseAsync().then(() => process.exit(process.exitCode ?? 0));
