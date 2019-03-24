$('a.menuItem').click((event) => {
    event.preventDefault();
    $('#contentWrapper').load('../view/' + $(event.target).attr('href') + '.view.html');
})