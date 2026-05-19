export enum LogPriority {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    FATAL = 4,
}

type LoggerOptions = {
    level?: LogPriority;
    prefix?: string;
};

export class Logger {
    public level: LogPriority;
    public prefix?: string;

    constructor(options: LoggerOptions = {}) {
        this.level = options.level ?? LogPriority.INFO;
        this.prefix = options.prefix;
    }

    private canPrint(priority: LogPriority) {
        return priority >= this.level;
    }

    private format(priority: keyof typeof LogPriority, message: string) {
        const date = new Date().toISOString();

        return `[${date}] [${priority}]${this.prefix ? ` [${this.prefix}]` : ""} ${message}`;
    }

    private write(priority: LogPriority, label: keyof typeof LogPriority, message: string) {
        if (!this.canPrint(priority)) return;

        console.log(this.format(label, message));
    }

    debug(message: string) {
        this.write(LogPriority.DEBUG, "DEBUG", message);
    }

    info(message: string) {
        this.write(LogPriority.INFO, "INFO", message);
    }

    warn(message: string) {
        this.write(LogPriority.WARN, "WARN", message);
    }

    error(message: string) {
        this.write(LogPriority.ERROR, "ERROR", message);
    }

    fatal(message: string) {
        this.write(LogPriority.FATAL, "FATAL", message);
    }

    child(prefix: string) {
        return new Logger({
            level: this.level,
            prefix: this.prefix
                ? `${this.prefix}:${prefix}`
                : prefix,
        });
    }
}