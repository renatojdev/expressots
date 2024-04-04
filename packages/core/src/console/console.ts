import { provide } from "inversify-binding-decorators";
import { ColorStyle, bgColorCodes, colorCodes } from "../common/color-codes";

/**
 * Interface representing application message details for console output.
 */
interface IApplicationMessageToConsole {
  appName: string;
  appVersion: string;
}

/**
 * The Console class provides methods for displaying styled messages in the console.
 * @provide Console
 */
@provide(Console)
class Console {
  /**
   * Print a message to the console with the specified color style.
   * @param message - The message to be printed.
   * @param colorStyle - The color style for the message.
   */
  private async printColor(
    message: string,
    colorStyle: ColorStyle,
  ): Promise<void> {
    const textColor = "black";
    const bgColor = colorStyle;
    console.log(
      `${bgColorCodes[bgColor]}${colorCodes[textColor]}${message}\x1b[0m`,
    );
  }

  /**
   * Display a message in the console with details about the running server.
   * @param port - The port number the server is running on.
   * @param environment - The server environment.
   * @param consoleMessage - Optional application message details for console output.
   */
  public async messageServer(
    port: number,
    environment: string,
    consoleMessage?: IApplicationMessageToConsole,
  ): Promise<void> {
    const appConsoleMessage: IApplicationMessageToConsole = {
      appName: consoleMessage?.appName || "Application",
      appVersion: consoleMessage?.appVersion || "not provided",
    };

    let terminalColor: ColorStyle = ColorStyle.None;

    switch (environment.toLowerCase()) {
      case "development":
        terminalColor = ColorStyle.Yellow;
        break;
      case "staging":
        terminalColor = ColorStyle.Blue;
        break;
      case "production":
        terminalColor = ColorStyle.Green;
        break;
      default:
        terminalColor = ColorStyle.Red;
        break;
    }

    this.printColor(
      `${appConsoleMessage.appName} version ${appConsoleMessage.appVersion} is running on ` +
        `port ${port} - Environment: ${environment}`,
      terminalColor,
    );
  }
}

export { Console, IApplicationMessageToConsole };
