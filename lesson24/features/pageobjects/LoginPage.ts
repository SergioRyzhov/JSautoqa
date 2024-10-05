import { Base } from './Base';

export class LoginPage extends Base {
    async inputData(locator: string, value: string) {
        const element = $(locator);
        await element.waitForDisplayed({ timeout: 3000 });
        await element.setValue(value);
    }
}