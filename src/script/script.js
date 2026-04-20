async function gerar() {
  const file = document.getElementById("imagem").files[0];

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const imagemBase64 = file ? await toBase64(file) : "";

  const dados = {
    cliente: document.getElementById("cliente").value,
    sistema: document.getElementById("sistema").value,
    modulo: document.getElementById("modulo").value,
    projeto: document.getElementById("projeto").value,
    documento: document.getElementById("documento").value,
    autor: document.getElementById("autor").value,
    data: document.getElementById("data").value,
    conclusao: document.getElementById("conclusao").value,

    logo: "https://c5gwmsmjx1.execute-api.us-east-1.amazonaws.com/prod/dados_processo_seletivo/logo_empresa/115191/Capturar2.JPG",
    imagem: imagemBase64
  };

  const res = await fetch("http://localhost:3000/gerar-pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  });

  const blob = await res.blob();

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "documento.pdf";
  a.click();
}