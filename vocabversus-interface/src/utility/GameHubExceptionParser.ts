export enum GameHubExceptionCode {
    UnkownError = 0,
    IdentifierNotFound = 100,
    UserNotFound = 200,
    UserAddFailed = 201,
}

const gameHubErrorCodeIndicator: string = import.meta.env.VITE_GAME_HUB_EXCEPTION_CODE_INDICATOR
export function GetErrorCode(errorMessage: string): GameHubExceptionCode{
    const expression = new RegExp(`<${gameHubErrorCodeIndicator}>(\\d*)</${gameHubErrorCodeIndicator}>`);
    const matchedErrorText = String(errorMessage).match(expression)?.[1] ?? "0"
    return Number(matchedErrorText);
}