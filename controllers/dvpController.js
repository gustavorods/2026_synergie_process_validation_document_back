const puppeteer = require("puppeteer");
const fs = require("fs/promises");

async function generateDvp(req, res) {
  let browser;

  try {
    const dados = req.body;

    if (!dados || typeof dados !== "object") {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    // lê template
    let html = await fs.readFile("template.html", "utf8");

    // substitui variáveis
    for (const key of Object.keys(dados)) {
      html = html.replaceAll(`{{${key}}}`, String(dados[key] ?? ""));
    }

    // inicia browser
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=documento.pdf"
    });

    return res.send(pdf);

  } catch (error) {
    console.error("Erro ao gerar PDF:", error);

    return res.status(500).json({
      error: "Erro interno ao gerar documento"
    });

  } finally {
    // garante que o browser SEMPRE fecha
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = { generateDvp };