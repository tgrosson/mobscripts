/* eslint-env es6 */
"use strict";

$(document).on('click', '.close', function() {
	$(this).parents('.modal').hide()
});

function createNewYear() {
	var year = window.prompt('Enter a year');
	
	if(year.length > 0) {
		var text2add = '<i>Add this line near the top of the page, with its similar lines:</i><br>';
		text2add += '&lt;a href=\"#\" onclick=\"return show(\'' + year + '\',\'year\');\"&gt;' + year + '&lt;/a&gt;<br><br>';

		text2add += '<i>Then add these lines to their appropriate place in the section immediately below:</i><br>';
		text2add += '&lt;div class=\"year\" id=\"' + year + '\"&gt;<br>';
		text2add += '\t&lt;table&gt;<br>';
		text2add += '\t&lt;tbody&gt;&lt;tr&gt;<br>\t\t<br>';
		text2add += '\t&lt;/tr&gt;<br>\t&lt;/tbody&gt;&lt;/table&gt;<br>&lt;/div&gt;<br>';

		$('#html-container').append(text2add);
	}
}

function createShow() {
	var text2add = '<i>Add this code in its appropriate place in the large section of the page:</i><br>';
	text2add += '&lt;div class=\"script\" id=\"' + $('#script-id').val() + '\"&gt;<br>';
	
	var oppon = $('#opponent').val();
	var home = $('#home:checked').val();
	var away = $('#away:checked').val();
	
	if(home) {
		text2add += '\t&lt;h3&gt;' + oppon + ' vs. Rice' + '&lt;/h3&gt;<br>';
	} else if (away) {
		text2add += '\t&lt;h3&gt;' + 'Rice vs. ' + oppon + '&lt;/h3&gt;<br>';
	}
	
	var stadium = $('#stadium').val();
	var location = $('#location').val();
	var date = $('#date').val()
	var hasStadium = stadium.length > 0;
	var hasLocation = location.length > 0;
	var hasDate = date.length > 0;
	
	text2add += '\t&lt;h5&gt;&lt;i&gt;'
	if(hasStadium) {
		text2add += stadium;
		if(hasLocation) {
			text2add += ' &amp;mdash; ';
		}
	}
	if(hasLocation) {
		text2add += location;
	}
	if((hasLocation || hasStadium) && hasDate) {
		text2add += '&lt;br&gt;';
	}
	if(hasDate) {
		text2add += date;
	}
	text2add += '&lt;/i&gt;&lt;/h5&gt;<br>';
	
	var gameResult = $('[name="result"]:checked').val();
	var score1 = $('#score1').val();
	var score2 = $('#score2').val();
	
	if(gameResult) {
		text2add += '\t&lt;p&gt;' + 'Result: ' + gameResult + ' ' + score1 + '&amp;mdash;' + score2 + '&lt;/p&gt;<br>'
	}
	
	$('#html-container').append(text2add);
	
	$('#show-builder-modal').hide();
}

function addTitle() {
	var title = $('#title').val();
	var text2add = '';
	
	if(title.length > 0) {
		text2add = '\t&lt;h4&gt;' + title + '&lt;/h4&gt;<br>';
	}
	
	text2add += '\t&lt;table&gt;&lt;tbody&gt;<br>';
	
	$('#html-container').append(text2add);
	
	$('#title-modal').hide();
}

function addLine() {
	var text2add = '\t&lt;tr&gt;<br>\t\t&lt;td class=\"left\"&gt;';
	
	var actor = $('[name="actor"]:checked').val();
	
	if(actor !== 'other' && actor !== undefined) {
		text2add += actor + ':';
	} else {
		var other = $('#other-field').val();
		if(other.length > 0) {
			text2add += other + ':';
		}
	}
	text2add += '&lt;/td&gt;<br>\t\t&lt;td&gt;';
	
	var what = $('#what').val();
	
	if(actor==='Formation' && $('#spellout').is(':checked')) {
		text2add += '&lt;b&gt;' + what + '&lt;/b&gt;';
	} else if(actor === 'Music' || actor === 'Action' || actor === 'MOB') {
		text2add += '&lt;i&gt;' + what + '&lt;/i&gt;';
	} else {
		text2add += what;
	}
	
	text2add += '&lt;/td&gt;<br>\t&lt;/tr&gt;<br>';
	
	$('#html-container').append(text2add);
	
	$('#line-modal').hide();
	$('#line-form').trigger('reset');
}

function newSegment() {
	var scriptText = $('#html-container').html();
	var loc = scriptText.lastIndexOf('&lt;tr');
	var firstHalf = scriptText.substring(0,loc+6);
	var secondHalf = scriptText.substring(loc+6);
	
	var newText = firstHalf + ' class=\"bot\"' + secondHalf;
	$('#html-container').html(newText);
}

function addEpilogue() {
	var epilogue = $('#epilogue').val();
	
	var text2add = '\t&lt;tr class=\"epilogue\"&gt;<br>';
	text2add += '\t\t&lt;td class=\"left\"&gt;Epilogue:&lt;/td&gt;<br>';
	text2add += '\t\t&lt;td&gt;&lt;i&gt;' + epilogue + '&lt;/i&gt;&lt;/td&gt;<br>';
	text2add += '\t&lt;/tr&gt;<br>';
	
	$('#html-container').append(text2add);
	
	$('#epilogue-modal').hide();
}

function closeTitle() {
	$('#html-container').append('\t&lt;/tbody&gt;&lt;/table&gt;<br>');
}

function finalize() {
	$('#html-container').append('&lt;/div&gt;<br>');
}

function createShowLink() {
	var text2add = '<i>Place this line between the &lt;tr&gt;&lt;/tr&gt; tags in the appropriate year. If there are already three links between these tags, add another &lt;tr&gt;&lt;/tr&gt; pair directly after the first, and add this line between the new tags.</i><br>';
	
	text2add += '&lt;td class=\"title\"&gt;&lt;a href=\"#\" onclick=\"return show(\'' + $('#script-id').val() + '\',\'script\');\"&gt;';
	
	var title = $('#link-title').val();
	var oppon = $('#opponent-short').val();
	
	if(title.length > 0) {
		text2add += title + '&lt;/a&gt;&lt;br&gt;';
	}
	if($('#away:checked').val()) {
		text2add += '@ ';
	}
	if(oppon.length > 0) {
		text2add += oppon + ', ';
	}
	text2add += $('#date-short').val();
	if(title.length === 0) {
		text2add += '&lt;/a&gt;';
	}
	text2add += '&lt;/td&gt;<br><br>';
	
	$('#html-container').prepend(text2add);
	
	$('#show-link-modal').hide();
}

function clearAll() {
	$('#html-container').empty();
	$('form').trigger('reset');
}