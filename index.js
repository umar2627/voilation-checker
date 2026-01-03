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



  const resultDiv = document.getElementById('result');

  if (!engages) {
    resultDiv.textContent = "✅ Compliant: Not engaging in credit activities.";
    resultDiv.className = "result compliant";
    return;
  }

  if (hasLicence) {
    resultDiv.textContent = "✅ Compliant: You hold a valid Australian Credit Licence.";
    resultDiv.className = "result compliant";
    return;
  }

  if (actsForPrincipal && withinAuthority && (principalLicensed || principalExempt)) {
    resultDiv.textContent = "✅ Compliant: Defence applies (acting under authority of a licensed or exempt principal).";
    resultDiv.className = "result compliant";
    return;
  }

  // If we reach here, it's non-compliant
  resultDiv.textContent = "❌ Non-Compliant: Engaging in credit activity without licence or defence. This may breach s29(1)-(2).";
  resultDiv.className = "result noncompliant";
}
