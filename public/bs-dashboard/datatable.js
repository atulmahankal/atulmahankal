$.extend(true, $.fn.dataTable.defaults, {
	searching: true,
	ordering: true,
	aLengthMenu: [
		[10, 25, 50, 100, -1],
		[10, 25, 50, 100, "All"]
	],
	iDisplayLength: 50,
	orderCellsTop: true,
	fixedHeader: true,
	drawCallback: function () {
		var api = this.api();
		// For each column
		api
			.columns()
			.eq(0)
			.each(function (colIdx) {
				// Set the header cell to contain the input element
				var cell = $('.filters th').eq(
					$(api.column(colIdx).header()).index()
				);
				var title = $(cell).text();
				$(cell)
				.css('padding', '0')
				.html('<input type="text" placeholder="Search ' + title + '" style="width:100%; padding: 2px 1px; line-height: 18px; font-size: 12px; color: black;font-weight: normal;" />');

				// On every keypress in this input
				$(
					'input',
					$('.filters th').eq($(api.column(colIdx).header()).index())
				)
					.off('keyup change')
					.on('change', function (e) {
						// Get the search value
						$(this).attr('title', $(this).val());
						var regexr = '({search})'; //$(this).parents('th').find('select').val();

						var cursorPosition = this.selectionStart;
						// Search the column for that value
						api
							.column(colIdx)
							.search(
								this.value != ''
									? regexr.replace('{search}', '(((' + this.value + ')))')
									: '',
								this.value != '',
								this.value == ''
							)
							.draw();
					})
					.on('keyup', function (e) {
						e.stopPropagation();

						$(this).trigger('change');
						$(this)
							.focus()[0]
							.setSelectionRange(cursorPosition, cursorPosition);
					});
			});
	}
});

$(function () {	// on document load
	$(".data-table").each(function () {
		$(this).find('thead tr')
			.clone(true)
			.addClass('filters')
			.appendTo($(this).find('thead'));
	});
	
});