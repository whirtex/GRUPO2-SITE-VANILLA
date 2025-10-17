const onlyDigits = (s) => (s || "").replace(/\D/g, "");

function validaCNPJ(cnpjStr) {
  const cnpj = onlyDigits(cnpjStr);
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  let soma = 0;
  let peso = 5;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }
  let dv1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  soma = 0;
  peso = 6;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }
  let dv2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  return dv1 === parseInt(cnpj.charAt(12)) && dv2 === parseInt(cnpj.charAt(13));
}

const cnpjInput = document.getElementById("cnpj");
cnpjInput.addEventListener("input", () => {
  const d = onlyDigits(cnpjInput.value).slice(0, 14);
  const parts = [];
  if (d.length > 0) parts.push(d.substring(0, 2));
  if (d.length >= 3) parts.push(d.substring(2, 5));
  if (d.length >= 6) parts.push(d.substring(5, 8));
  let out = "";
  if (d.length <= 2) out = parts[0] || "";
  else if (d.length <= 5) out = `${parts[0]}.${parts[1]}`;
  else if (d.length <= 8) out = `${parts[0]}.${parts[1]}.${parts[2]}`;
  else if (d.length <= 12)
    out = `${parts[0]}.${parts[1]}.${parts[2]}/${d.substring(8, 12)}`;
  else
    out = `${parts[0]}.${parts[1]}.${parts[2]}/${d.substring(
      8,
      12
    )}-${d.substring(12, 14)}`;
  cnpjInput.value = out;
  cnpjInput.setCustomValidity("");
});

const form = document.getElementById("formCadastro");
form.addEventListener("submit", (e) => {
  document
    .querySelectorAll("input, select")
    .forEach((el) => el.setCustomValidity(""));

  if (!form.checkValidity()) {
    e.preventDefault();
    form.reportValidity();
    return;
  }

  const cnpjVal = document.getElementById("cnpj");
  if (!validaCNPJ(cnpjVal.value)) {
    e.preventDefault();
    cnpjVal.setCustomValidity("CNPJ inválido.");
    cnpjVal.reportValidity();
    cnpjVal.focus();
    return;
  }

  e.preventDefault();
  window.location.href = "/code/main/index.html";
});

document.getElementById("btnLogin").addEventListener("click", () => {
  window.location.href = "/code/main/index.html";
});
