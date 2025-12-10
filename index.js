function checkCompliance() {
  const engages = document.getElementById("engagesInCreditActivity").value === "true";
  const hasLicence = document.getElementById("hasLicence").value === "true";
  const actsForPrincipal = document.getElementById("actsOnBehalfOfPrincipal").value === "true";
  const principalLicensed = document.getElementById("principalHoldsLicence").value === "true";
  const principalExempt = document.getElementById("principalIsExempt").value === "true";
  const withinAuthority = document.getElementById("conductWithinAuthority").value === "true";

  const resultDiv = document.getElementById("result");

  if (!engages) {
    resultDiv.textContent = "✅ Compliant: Not engaging in credit activities.";
    resultDiv.className = "result compliant";
  } 
  else if (hasLicence) {
    resultDiv.textContent = "✅ Compliant: You hold a valid Australian Credit Licence.";
    resultDiv.className = "result compliant";
  } 
  else if (actsForPrincipal && withinAuthority && (principalLicensed || principalExempt)) {
    resultDiv.textContent = "✅ Compliant: Defence applies (acting under authority of a licensed or exempt principal).";
    resultDiv.className = "result compliant";
  } 
  else {
    resultDiv.textContent = "❌ Non-Compliant: Engaging in credit activity without licence or defence. This may breach s29(1)-(2).";
    resultDiv.className = "result noncompliant";
  }
}
