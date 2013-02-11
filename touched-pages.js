    //<source lang="javascript">
    (function ($, window) {
    	function showData () {
            var links = [];
            $('#p-cactions').hide();
            $('div#content').html('');
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
            if(data.query) {
                parseData(data.query.usercontribs, links);
                loadAdditionalDataIfNeeded(data, links);
                $('div#content').prepend('Показано ' + $('a', 'div#content').length + ' затронутых страниц.<br /><br />');
            }
        }
        
    	function parseData(data, links) {
    		$(data).each(function () {
        		if(!links[this.title]) {
            		var a = $('<a>').attr('href', '/wk/' + this.title).attr('target', '_blank').html(this.title);
            		$('div#content').append(a).append('<br />');
            			links[this.title] = true;
        		}
    		});
    	}
		
    	function loadAdditionalDataIfNeeded(data, links) {
        	if(data['query-continue'] && data['query-continue']['usercontribs']['ucstart'] > 1 && confirm('Показаны не все результаты. Добрать недостающие?')) {
        	    $.get('/api.php', {
        	        format: 'json',
                    action: 'query',
        	        list: 'usercontribs',
        	        uclimit: 500,
        	        ucdir: 'newer',
        	        ucuser: wgUserName,
        	        ucstart: data['query-continue']['usercontribs']['ucstart']
        	    }, handleData, 'json');
        	}
    	}
        
        $(function () {
            $('html').addClass('touched-pages-user-js');
            
            if (window.location.hash === '#touched-pages') {
                showData();
            }

            $('<a>')
                .attr('href', '/wk/User:' + wgUserName + '/#touched-pages')
                .html('Затронутые&nbsp;страницы')
                .insertAfter('li#pt-mycontris')
                .wrap('<li id="touched-pages"></li>');
        });
    })(jQuery, window);
    //</source>
