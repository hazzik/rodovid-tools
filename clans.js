///<reference path="jquery.d.ts" />
//<source lang="javascript">
var __lang = window['wgContentLanguage'] || 'ru';
var Rule = (function () {
    function Rule(pattern, replacement) {
        this.pattern = pattern;
        this.replacement = replacement;
    }
    Rule.prototype.match = function (text) {
        return !!text.match(this.pattern);
    };
    Rule.prototype.apply = function (text) {
        return text.replace(this.pattern, this.replacement);
    };
    return Rule;
})();
var Rules = (function () {
    function Rules() { }
    Rules.all = {
        'ru': [
            new Rule(/(([ео]в)|(ин))(а)?$/, '$1ы'), 
            new Rule(/[оы]й$/, 'ые'), 
            new Rule(/ий$/, 'ие'), 
            new Rule(/([вснтд])ая$/, '$1ые'), 
            new Rule(/([кц])ая$/, '$1ие'), 
            new Rule(/вич$/, '$&и')
        ],
        'uk': [
            new Rule(/(([еоі]в)|([иі]н))(а)?$/, '$1и'), 
            new Rule(/(енк)о$/, '$1и'), 
            new Rule(/[оиі]й$/, 'і'), 
            new Rule(/а$/, 'і'), 
            new Rule(/вич$/, '$&і')
        ]
    };
    Rules.apply = function apply(text) {
        var rules = Rules.all[__lang];
        for(var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            text = rule.apply(text);
        }
        return text;
    };
    Rules.match = function match(text) {
        var rules = Rules.all[__lang];
        for(var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            if(rule.match(text)) {
                return true;
            }
        }
        return false;
    };
    return Rules;
})();
(function ($) {
    var nameTranslations = {
        'Агафія': {
            'source': 'uk',
            'ru': 'Агафья'
        },
        'Ангеліна': {
            'source': 'uk',
            'ru': 'Ангелина'
        },
        'Анжеліка': {
            'source': 'uk',
            'ru': 'Анжелика'
        },
        'Віра': {
            'source': 'uk',
            'ru': 'Вера'
        },
        'Ганна': {
            'source': 'uk',
            'ru': 'Анна'
        },
        'Євгенія': {
            'source': 'uk',
            'ru': 'Евгения'
        },
        'Євдокія': {
            'source': 'uk',
            'ru': 'Евдокия'
        },
        'Інна': {
            'source': 'uk',
            'ru': 'Инна'
        },
        'Ірина': {
            'source': 'uk',
            'ru': 'Ирина'
        },
        'Любов': {
            'source': 'uk',
            'ru': 'Любовь'
        },
        'Марія': {
            'source': 'uk',
            'ru': 'Мария'
        },
        'Надія': {
            'source': 'uk',
            'ru': 'Надежда'
        },
        'Наталія': {
            'source': 'uk',
            'ru': 'Наталья'
        },
        'Раїса': {
            'source': 'uk',
            'ru': 'Раиса'
        },
        'Світлана': {
            'source': 'uk',
            'ru': 'Светлана'
        },
        'Тетяна': {
            'source': 'uk',
            'ru': 'Татьяна'
        },
        'Христина': {
            'source': 'uk',
            'ru': 'Кристина'
        },
        'Юлія': {
            'source': 'uk',
            'ru': 'Юлия'
        },
        'Агафья': {
            'source': 'ru',
            'uk': 'Агафія'
        },
        'Ангелина': {
            'source': 'ru',
            'uk': 'Ангеліна'
        },
        'Анжелика': {
            'source': 'ru',
            'uk': 'Анжеліка'
        },
        'Вера': {
            'source': 'ru',
            'uk': 'Віра'
        },
        'Анна': {
            'source': 'ru',
            'uk': 'Ганна'
        },
        'Евгения': {
            'source': 'ru',
            'uk': 'Євгенія'
        },
        'Евдокия': {
            'source': 'ru',
            'uk': 'Євдокія'
        },
        'Инна': {
            'source': 'ru',
            'uk': 'Інна'
        },
        'Ирина': {
            'source': 'ru',
            'uk': 'Ірина'
        },
        'Любовь': {
            'source': 'ru',
            'uk': 'Любов',
            'en': 'Lyubov'
        },
        'Мария': {
            'source': 'ru',
            'uk': 'Марія'
        },
        'Надежда': {
            'source': 'ru',
            'uk': 'Надія'
        },
        'Наталья': {
            'source': 'ru',
            'uk': 'Наталія'
        },
        'Раиса': {
            'source': 'ru',
            'uk': 'Раїса'
        },
        'Светлана': {
            'source': 'ru',
            'uk': 'Світлана'
        },
        'Татьяна': {
            'source': 'ru',
            'uk': 'Тетяна'
        },
        'Кристина': {
            'source': 'ru',
            'uk': 'Христина'
        },
        'Юлия': {
            'source': 'ru',
            'uk': 'Юлія'
        },
        'Анатолій': {
            'source': 'uk',
            'ru': 'Анатолий'
        },
        'Андрій': {
            'source': 'uk',
            'ru': 'Андрей'
        },
        'Антон': {
            'source': 'ru',
            'uk': 'Антін'
        },
        'Антін': {
            'source': 'uk',
            'ru': 'Антон'
        },
        'Василь': {
            'source': 'uk',
            'ru': 'Василий'
        },
        'Віктор': {
            'source': 'uk',
            'ru': 'Виктор'
        },
        'Віталій': {
            'source': 'uk',
            'ru': 'Виталий'
        },
        'Володимир': {
            'source': 'uk',
            'ru': 'Владимир'
        },
        'Гаврило': {
            'source': 'uk',
            'ru': 'Гаврила'
        },
        'Геннадій': {
            'source': 'uk',
            'ru': 'Геннадий'
        },
        'Григорій': {
            'source': 'uk',
            'ru': 'Григорий'
        },
        'Дмитро': {
            'source': 'uk',
            'ru': 'Дмитрий'
        },
        'Едуард': {
            'source': 'uk',
            'ru': 'Эдуард'
        },
        'Іван': {
            'source': 'uk',
            'ru': 'Иван'
        },
        'Ігор': {
            'source': 'uk',
            'ru': 'Игорь'
        },
        'Микола': {
            'source': 'uk',
            'ru': 'Николай'
        },
        'Михайло': {
            'source': 'uk',
            'ru': 'Михаил'
        },
        'Нікіта': {
            'source': 'uk',
            'ru': 'Никита'
        },
        'Олександр': {
            'source': 'uk',
            'ru': 'Александр'
        },
        'Олексій': {
            'source': 'uk',
            'ru': 'Алексей'
        },
        'Петро': {
            'source': 'uk',
            'ru': 'Пётр'
        },
        'Павло': {
            'source': 'uk',
            'ru': 'Павел'
        },
        'Сергій': {
            'source': 'uk',
            'ru': 'Сергей'
        },
        'Федір': {
            'source': 'uk',
            'ru': 'Фёдор',
            'en': 'Fedir'
        },
        'Юрій': {
            'source': 'uk',
            'ru': 'Юрий'
        },
        'Яків': {
            'source': 'uk',
            'ru': 'Яков'
        },
        'Александр': {
            'source': 'ru',
            'uk': 'Олександр'
        },
        'Алексей': {
            'source': 'ru',
            'uk': 'Олексій'
        },
        'Анатолий': {
            'source': 'ru',
            'uk': 'Анатолій'
        },
        'Андрей': {
            'source': 'ru',
            'uk': 'Андрій'
        },
        'Василий': {
            'source': 'ru',
            'uk': 'Василь'
        },
        'Виктор': {
            'source': 'ru',
            'uk': 'Віктор'
        },
        'Виталий': {
            'source': 'ru',
            'uk': 'Віталій'
        },
        'Владимир': {
            'source': 'ru',
            'uk': 'Володимир'
        },
        'Гаврила': {
            'source': 'ru',
            'uk': 'Гаврило'
        },
        'Геннадий': {
            'source': 'ru',
            'uk': 'Геннадій'
        },
        'Григорий': {
            'source': 'ru',
            'uk': 'Григорій'
        },
        'Дмитрий': {
            'source': 'ru',
            'uk': 'Дмитро'
        },
        'Эдуард': {
            'source': 'ru',
            'uk': 'Едуард'
        },
        'Иван': {
            'source': 'ru',
            'uk': 'Іван'
        },
        'Игорь': {
            'source': 'ru',
            'uk': 'Ігор'
        },
        'Николай': {
            'source': 'ru',
            'uk': 'Микола'
        },
        'Михаил': {
            'source': 'ru',
            'uk': 'Михайло',
            'en': 'Mikhail'
        },
        'Никита': {
            'source': 'ru',
            'uk': 'Нікіта',
            'en': 'Nikita'
        },
        'Пётр': {
            'source': 'ru',
            'uk': 'Петро',
            'en': 'Peter'
        },
        'Павел': {
            'source': 'ru',
            'uk': 'Павло'
        },
        'Сергей': {
            'source': 'ru',
            'uk': 'Сергій'
        },
        'Фёдор': {
            'source': 'ru',
            'uk': 'Федір',
            'en': 'Fyodor'
        },
        'Юрий': {
            'source': 'ru',
            'uk': 'Юрій'
        },
        'Яков': {
            'source': 'ru',
            'uk': 'Яків'
        }
    };
    var letters = {
        'Є': 'Е',
        'є': 'е',
        'І': 'И',
        'і': 'и'
    };
    var summary = [];
    var appendSummary = function (text) {
        if(summary.indexOf(text) == -1) {
            summary.push(text);
        }
    };
    var replaceLetters = function (input) {
        if(input.length) {
            var value = input.val() || '';
            for(var k in letters) {
                value = value.replace(new RegExp(k, 'g'), letters[k]);
            }
            if(value != input.val()) {
                input.val(value);
                input.css({
                    'background-color': 'aqua'
                });
                appendSummary('автоматическая транслитерация с украинского на русский язык');
            }
        }
    };
    var translateName = function (input) {
        if(input.length) {
            var value = input.val() || '';
            var parts = value.split(/\s/);
            for(var i = 0; i < parts.length; i++) {
                var part = parts[i];
                var translated = nameTranslations[part];
                if(translated && translated[__lang]) {
                    parts[i] = translated[__lang];
                    appendSummary('автоматический перевод имени ' + translated.source + ' -> ' + __lang);
                }
            }
            value = parts.join(' ');
            if(value != input.val()) {
                input.css({
                    'background-color': 'aqua'
                });
                input.val(value);
            }
        }
    };
    var fixClan = function (input) {
        if(input.length) {
            var clanValue = Rules.apply(input.val() || '');
            if(clanValue != input.val()) {
                input.val(clanValue);
                input.css({
                    'background-color': 'aqua'
                });
                appendSummary('род автоматически приведён к форме именительного падежа множественного числа');
            }
        }
    };
    $(function () {
        $('a[href^="' + encodeURI('/wk/Род:') + '"]').filter(function (i, e) {
            return Rules.match($(e).text());
        }).css({
            'background-color': 'darkred',
            'color': 'white'
        });
        translateName($('input[name=nameatbirth]'));
        replaceLetters($(':input[name=fnameatbirth]'));
        replaceLetters($(':input[name=fnameother]'));
        replaceLetters($(':input[name=clan]'));
        fixClan($(':input[name=clan]'));
        if (summary.length) {
            $('#wpSummary').val(summary.join('; '));
        }
        if(location.hash == '#save') {
            $('#wpSave').click();
        }
    });
})(jQuery);
//</source>
