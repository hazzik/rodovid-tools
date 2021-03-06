    //<source lang="javascript">
    (function ($, window) {
        var links = [];
        function init() {
            $('#content .firstHeading').text('Затронутые страницы');
            $('#bodyContent').html('<p>Показано <span class="counter">0</span> затронутых страниц.</p><ul></ul><a href="#" class="more">Загрузить еще</a>');
    
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
                
                if(data['query-continue'] && data['query-continue']['usercontribs']['ucstart'] > 1) {
                    var start = data['query-continue']['usercontribs']['ucstart'];
                    $('#content .more').unbind('click').bind('click', function() {
                        $.get('/api.php', {
                            format: 'json',
                            action: 'query',
                            list: 'usercontribs',
                            uclimit: 500,
                            ucdir: 'newer',
                            ucuser: wgUserName,
                            ucstart: start
                        }, handleData, 'json'); 
                        return false;
                    });    
                } else {
                    $('#content .more').hide();
                }
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
