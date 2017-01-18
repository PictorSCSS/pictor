
var app = $({});
var page = $('section#page');;
var nav = $('section#nav');;

var escElement = document.createElement('textarea');

function escapeHTML(html) {
    escElement.textContent = html;
    return escElement.innerHTML;
}

function unescapeHTML(html) {
    escElement.innerHTML = html;
    return escElement.textContent;
}

app.on('highlight', function () {

    $('pre code').each(function(i, block) {

        hljs.highlightBlock(block);
    });
});

app.on('page', function(e, name) {

    $.get(['/pages/', name, '.html'].join(''), function (data) {

        page.html(data);
        app.trigger('highlight');

    }).fail(function () {

        alert('Not Found');

    });
});

app.on('part', function(e, opts) {

    var name = opts.name, appendTo = opts.appendTo;

    $.get(['/parts/', name, '.html'].join(''), function (data) {

        appendTo.html(data);
        app.trigger('part-loaded', name);

    }).fail(function () {

        alert('Part Not Found');

    });
});


function linkNavigate(target) {

    var href = target.href.replace(window.location.origin+'/#', '');

    href && app.trigger('page', href);
}

$(window).on('click', function(e) {

    var target = $(e.srcTarget || e.target);
    var resolved = false;


    if (target) {
        if (target[0].nodeName === 'A') {

            linkNavigate(target[0]);
            resolved = true;

        } else {
            target = target.parent('a');

            if (target.length) {
                linkNavigate(target[0]);
                resolved = true;
            }
        }
    }

    if (resolved) {

        // e.stopPropagation();
        // return false;
    }

})

$(document).ready(function () {

    setTimeout(function() {

        if (window.location.hash) {

            linkNavigate(window.location);

        } else {

            app.one('part-loaded', function() {
                nav.find('#logo a img').click();
            });
        }


        app.trigger('part', { name: 'nav', appendTo: nav });

    }, 10);


});
