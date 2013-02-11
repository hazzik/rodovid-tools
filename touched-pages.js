    //<source lang="javascript">
    (function ($, window) {
        var links = [];
    	function showData () {
            $('#p-cactions').hide();
            $('div#content').html('<p>Показано <span class=".counter">0</span> затронутых страниц.</p>');

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
                loadAdditionalDataIfNeeded(data);
                $('div#content .counter').text(links.length);
            }
        }
        
    	function parseData(data) {
    		$(data).each(function () {
        		if(!links[this.title]) {
            		var a = $('<a>').attr('href', '/wk/' + this.title).attr('target', '_blank').html(this.title);
            		$('div#content').append(a).append('<br />');
            			links[this.title] = true;
        		}
    		});
    	}
		
    	function loadAdditionalDataIfNeeded(data) {
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
