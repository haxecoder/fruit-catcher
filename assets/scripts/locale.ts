export type LocaleKey = "Gameplay.Points" | "Gameplay.Timer";

class Locale {

    public translate(key: LocaleKey, value?: any): string {
        switch (key) {
            case "Gameplay.Timer":
                return `Время: ${value}`;
            case "Gameplay.Points":
                return `Очки: ${value}`;
        }
    }

}

export const locale = new Locale();