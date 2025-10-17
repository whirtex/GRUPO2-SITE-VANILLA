const onlyDigits = (s) => (s || "").replace(/\D/g, "");

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

  e.preventDefault();
  window.location.href = "main/index.html";
});

document.getElementById("btnLogin").addEventListener("click", () => {
  window.location.href = "main/index.html";
});
