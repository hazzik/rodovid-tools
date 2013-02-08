    //<source lang="javascript">
    (function ($) {
        $(function () {
            $('html').addClass('add-edit-link-user-js');
            
            $('a[href^="' + encodeURI('/wk/Запись:') + '"]', '#bodyContent').after(function () {
                var a = $('<!--added-edit-link-->&nbsp;<a>');
                a.attr('href', $(this).attr('href') + '?action=edit');
                a.html('<sup>[edit]</sup>');
                return a;
            });
        });
    })(jQuery);
    //</source>
