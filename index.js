function getRadioValue(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value === 'true' : false;
}

function togglePenaltyVisibility() {
  const penaltySection = document.getElementById('penaltySection');
  const found = document.getElementById('foundGuilty');
  if (!penaltySection || !found) return;
  if (found.checked) penaltySection.classList.remove('hidden');
  else penaltySection.classList.add('hidden');
}

// Attach change handler if element exists (script runs at end of body)
const guiltyCheckbox = document.getElementById('foundGuilty');
if (guiltyCheckbox) guiltyCheckbox.addEventListener('change', togglePenaltyVisibility);

const defaultPenaltyMessage = 'Penalty not specified.';
const euroFormatter = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });

function checkCompliance() {
  const engages = getRadioValue('engagesInCreditActivity');
  const hasLicence = getRadioValue('hasLicence');
  const actsForPrincipal = getRadioValue('actsOnBehalfOfPrincipal');
  const principalLicensed = getRadioValue('principalHoldsLicence');
  const principalExempt = getRadioValue('principalIsExempt');
  const withinAuthority = getRadioValue('conductWithinAuthority');

  const foundGuilty = document.getElementById('foundGuilty') ? document.getElementById('foundGuilty').checked : false;
  const penaltyAmount = Number(document.getElementById('penaltyAmount') ? document.getElementById('penaltyAmount').value : 0);
  const penaltyName = document.getElementById('penaltyName') ? document.getElementById('penaltyName').value : '';
  const penaltyDescription = document.getElementById('penaltyDescription') ? document.getElementById('penaltyDescription').value : '';
  const offenceType = document.getElementById('offenceType') ? document.getElementById('offenceType').value : '';

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
  let message = "❌ Non-Compliant: Engaging in credit activity without licence or defence. This may breach s29(1)-(2).";
  message += '\n';
  if (offenceType) {
    message += `Offence: ${offenceType}. `;
  }

  if (foundGuilty) {
    // include name, amount and description if provided
    if (penaltyName) {
      message += `Penalty: ${penaltyName}. `;
    }
    if (penaltyAmount && penaltyAmount > 0) {
      message += `Amount: ${euroFormatter.format(penaltyAmount)}. `;
    }
    if (penaltyDescription) {
      message += `Details: ${penaltyDescription}. `;
    }
    if (!penaltyName && !(penaltyAmount && penaltyAmount > 0) && !penaltyDescription) {
      message += defaultPenaltyMessage;
    }
  } else {
    message += 'Not marked as found guilty.';
  }

  resultDiv.textContent = message;
  resultDiv.className = "result noncompliant";
}
