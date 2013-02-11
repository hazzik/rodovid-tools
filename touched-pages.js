    //<source lang="javascript">
    (function ($, window) {
        var links = [];
        function init() {
            $('#content .firstHeading').text('Затронутые страницы');
            $('#bodyContent').html('<p>Показано <span class="counter">0</span> затронутых страниц.</p><ul></ul>');
    
            $.get('/api.php', {
                format: 'json',
                action: 'query',
                list: 'usercontribs',
                uclimit: 500,
                ucdir: 'newer',
                ucuser: wgUserName
            }, handleData, 'json');
            return false;
        }
        
        function handleData(data) {
            if (data.query) {
                parseData(data.query.usercontribs);
                $('div#content .counter').text(links.length);
                loadAdditionalDataIfNeeded(data);
            }
        }
        
        function parseData(data) {
            $(data).map(function () {
                if (links.indexOf(this.title)==-1) {
                    links.push(this.title);
                    return $('<a>')
                        .attr('href', '/wk/' + this.title)
                        .attr('target', '_blank')
                        .html(this.title)
                        .get();                    
                }
            }).appendTo('#content ul').wrap('<li>');
        }
        
        function loadAdditionalDataIfNeeded(data) {
            if(data['query-continue'] && data['query-continue']['usercontribs']['ucstart'] > 1) {
                if (confirm('Показаны не все результаты. Добрать недостающие?')) {
                    $.get('/api.php', {
                        format: 'json',
                        action: 'query',
                        list: 'usercontribs',
                        uclimit: 500,
                        ucdir: 'newer',
                        ucuser: wgUserName,
                        ucstart: data['query-continue']['usercontribs']['ucstart']
                    }, handleData, 'json');
                } else {
                    var a = $('#content a.more');
                    if (!a.length) {
                        a = $('<a>')
                            .addClass('more')
                            .attr('href', '#')
                            .text('Загрузить больше')
                            .appendTo('#content');
                    }
                    a.unbind('click')
                        .click(function () {
                            loadAdditionalDataIfNeeded(data);    
                        });
                }
            } else {
                $('#content a.more').hide();    
            }
        }
        
        $(function () {
            $('html').addClass('touched-pages-user-js');
            
            if (window.location.hash === '#touched-pages') {
                init();
            }
    
            $('<a>')
                .attr('href', '/wk/User:' + wgUserName + '/#touched-pages')
                .html('Затронутые&nbsp;страницы')
                .insertAfter('#pt-mycontris')
                .wrap('<li id="touched-pages"></li>');
        });
    })(jQuery, window);
    //</source>
