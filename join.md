---
title: Join
layout: main-layout.hbs
base: ../
main-class: content-background content-padding
---
<h2 class="divider">Membership Dues</h2>

Dues for new members are $40 per year worldwide. 
Dues are due by January 31 of each year. The
dues cover the costs of the publications which are the
"vehicles" for our communications. Past issues of the North American MMM
Newsletters are available for download in the [Newsletters tab](newsletters/)
of this website.

For more information about our club membership, visit the [About
Us page](about-us/)

You can now renew and pay your membership dues directly via PayPal. Use the
form below.

<form class="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="radio" id="renewal" name="amount" value="50.00" checked>
<label id="renewal-label" for="renewal"><b>Renewal: $50.00</b></label><br><br>
<input type="radio" id="new-member" name="amount" value="40.00">
<label for="new-member"><b>New Membership: $40.00</b></label><br><br>
<input type="hidden" name="cmd" value="_xclick">
<input type="hidden" name="business" value="renewal@nammmr.org">
<input type="hidden" name="lc" value="US">
<input type="hidden" name="item_name" value="NAMMMR Annual Membership">
<input type="hidden" name="currency_code" value="USD">
<input type="hidden" name="button_subtype" value="services">
<input type="hidden" name="no_note" value="0">
<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHostedGuest">
<input type="image" src="img/paypal.png" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
</form>

<script>
function documentReady() {
	let [month, day, year] = new Date().toLocaleDateString("en-US").split("/");
	let renewal_el = $('#renewal');
	let label_el = $('#renewal-label');
	let amount = '50.00';
	let suffix = '';
	if (month == 11 || month == 12 || (month == 1 && day <= 15)) {
		amount = '35.00';
		suffix = ` ($40 after Jan 15, ${+year+1})`
	} else if (month == 1) {
		amount = '40.00';
		suffix = ` ($50 after Jan 31, ${year})`
	}
	renewal_el.attr('value', amount);
	label_el.html(`<strong>Renewal: \$${amount}</strong><em>${suffix}</em>`);
}
</script>


<h2 class="divider">Membership Application</h2>

<a class="doc-thumb float-left" href="join/nammmr-application.pdf">
	<img class="shadowed" src="join/nammmr-application.png">
	<div class="caption">Application Form</div>
</a>

To apply for membership, download our membership application form and submit
via mail. 

The [NAMMMR Purpose & Guidelines document](guidelines-and-purposes)
contains Definitions and Qualifications for authentic MMM cars as recognised
by the MGCC UK, Triple-M Register and published in their Register Directory,
as well as our own.

<img class="sketch" src="img/k3-sketch.png" alt="">
