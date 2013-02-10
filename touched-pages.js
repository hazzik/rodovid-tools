    //<source lang="javascript">
    (function ($) {
        $(function () {
            $('html').addClass('touched-pages-user-js');
    
            var link = $('<a>').attr('href', '#').html('Затронутые&nbsp;страницы');
            var menu = $('<li id="touched-pages"></li>').append(link);
            $('li#pt-mycontris').after(menu);
    
            $('#touched-pages a', 'ul').click(function(){
                var links = [];
    
                function parseData(data, links) {
                   $(data).each(function(){
                        if(!links[this.title])
                        {
                            var a = $('<a>').attr('href', '/wk/' + this.title).attr('target', '_blank').html(this.title);
                            $('div#content').append(a).append('<br />');
                            links[this.title] = true;
                        }
                    });
                }
    
                function loadAdditionalDataIfNeeded(data, links)
                {
                    if (data['query-continue'] && data['query-continue']['usercontribs']['ucstart'] > 1 && confirm('Показаны не все результаты. Добрать недостающие?'))
                    {
                        $.get(
                            '/api.php',
                            {
                                format: 'json',
                                list: 'usercontribs',
                                action: 'query',
                                uclimit: 500,
                                ucdir: 'newer',
                                ucuser: wgUserName,
                                ucstart: data['query-continue']['usercontribs']['ucstart']
                            },
                            function(data)
                            {
                                if (data.query)
                                {
                                    parseData(data.query.usercontribs, links);
    
                                    loadAdditionalDataIfNeeded(data, links);
    
                                    $('div#content').prepend('Показано '+ $('a', 'div#content').length +' затронутых страниц.<br /><br />');
                                }
                            },
                            'json'
                        );
                    }
                }
    
                $('#p-cactions').hide();
                $('div#content').html('');
                $.get(
                    '/api.php',
                    {
                        format: 'json',
                        list: 'usercontribs',
                        action: 'query',
                        uclimit: 500,
                        ucdir: 'newer',
                        ucuser: wgUserName
                    },
                    function(data)
                    {
                        if (data.query)
                        {
                            parseData(data.query.usercontribs, links);
                            loadAdditionalDataIfNeeded(data, links);
                        }
                    },
                    'json'
                );
                return false;
            });
        });
    })(jQuery);
    //</source>
