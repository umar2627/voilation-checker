function getRadioValue(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value === 'true' : false;
}





function checkCompliance() {
  const engages = getRadioValue('engagesInCreditActivity');
  const hasLicence = getRadioValue('hasLicence');
  const actsForPrincipal = getRadioValue('actsOnBehalfOfPrincipal');
  const principalLicensed = getRadioValue('principalHoldsLicence');
  const principalExempt = getRadioValue('principalIsExempt');
  const withinAuthority = getRadioValue('conductWithinAuthority');

  const resultSection = document.getElementById('result');
  const statusText = document.getElementById('statusText');

  if (!engages) {
    statusText.textContent = "✅ Compliant: Not engaging in credit activities.";
    resultSection.className = "result neutral result-column compliant";
    return;
  }

  if (hasLicence) {
    statusText.textContent = "✅ Compliant: You hold a valid Australian Credit Licence.";
    resultSection.className = "result neutral result-column compliant";
    return;
  }

  if (actsForPrincipal && withinAuthority && (principalLicensed || principalExempt)) {
    statusText.textContent = "✅ Compliant: Defence applies (acting under authority of a licensed or exempt principal).";
    resultSection.className = "result neutral result-column compliant";
    return;
  }

  // If we reach here, it's non-compliant
  statusText.textContent = "❌ Non-Compliant: Engaging in credit activity without licence or defence. This may breach s29(1)-(2).";
  resultSection.className = "result neutral result-column noncompliant";
}
