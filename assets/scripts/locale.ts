export type LocaleKey = "Gameplay.Points" | "Gameplay.Timer" | "Gameplay.Hearts" | "Gameplay.Series";

class Locale {

    public translate(key: LocaleKey, value?: any): string {
        switch (key) {
            case "Gameplay.Hearts":
                return `Жизни: ${value}`;
            case "Gameplay.Timer":
                return `Время: ${value}`;
            case "Gameplay.Series":
                return `Бонус за серию: ${value}`;
            case "Gameplay.Points":
                return `Очки: ${value}`;
        }
    }

}

export const locale = new Locale();