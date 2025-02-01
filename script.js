async function fetchPluginData(pluginName) {
  try {
    const url = `https://mp-gateway.elgato.com/products?name=${encodeURIComponent(
      pluginName
    )}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.results || data.results.length === 0) {
      throw new Error("Plugin not found.");
    }

    const product = data.results[0];
    const orgId = product.organization_id;
    const productId = product.id;
    const marketplaceLink = `https://marketplace.elgato.com/product/${product.slug}`;

    return { orgId, productId, marketplaceLink };
  } catch (error) {
    console.error("Error fetching plugin data:", error);
    alert("Failed to retrieve plugin data. Please check the plugin name.");
    return null;
  }
}

async function generateBadges() {
  const pluginName = document.getElementById("pluginUrl").value;

  if (!pluginName) {
    alert("Please enter a plugin name.");
    return;
  }

  const data = await fetchPluginData(pluginName);
  if (!data) return;

  const orgIdElement = document.getElementById("orgId");
  const productIdElement = document.getElementById("productId");
  const marketplaceLinkElement = document.getElementById("marketplaceLink");

  if (orgIdElement && productIdElement) {
    orgIdElement.value = data.orgId;
    productIdElement.value = data.productId;
    marketplaceLinkElement.value = data.marketplaceLink;
  } else {
    console.error("orgId or productId element not found.");
  }

  generateBadgeImages();
}

function generateBadgeImages() {
  const orgId = document.getElementById("orgId").value;
  const productId = document.getElementById("productId").value;
  const marketplaceLink = document.getElementById("marketplaceLink").value;

  if (!orgId || !productId) {
    alert("Please enter both Organization ID and Product ID.");
    return;
  }

  const badgeContainer = document.getElementById("badgeContainer");
  badgeContainer.innerHTML = "";

  const placeholderBadgeUrl = `https://img.shields.io/badge/dynamic/json?logo=data:image/svg%2bxml;base64,PHN2ZyB3aWR0aD0iMjMwIiBoZWlnaHQ9IjIzMCIgdmlld0JveD0iMCAwIDIzMCAyMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02My45NzEgMzguNDgzTDY0LjA5MSAzOC41NzNMMTA5LjY5MiA2NC43NzdDMTA3LjQ1MyA3Ny4yODUgMTAwLjg5NCA4OC43MTIgOTEuMTgzIDk2Ljk3NkM4MS4zMTYgMTA1LjM3MyA2OC43NDkgMTEwIDU1Ljc5MSAxMTBDNDEuMTU5IDExMCAyNy40MDMgMTA0LjI4IDE3LjA1IDkzLjg5MUM2LjcwMiA4My41MDIgMSA2OS42ODYgMSA1NUMxIDQwLjMxNCA2LjcwMiAyNi40OTggMTcuMDQ5IDE2LjEwOUMyNy4zOTYgNS43MiA0MS4xNTIgMCA1NS43OSAwQzY2Ljk3MSAwIDc3LjcyIDMuMzYxIDg2Ljg3OSA5LjcxMUM5NS44MjggMTUuOTE3IDEwMi42NzYgMjQuNTQxIDEwNi42OTEgMzQuNjU0QzEwNy4yMDEgMzUuOTUgMTA3LjY3NSAzNy4yODMgMTA4LjA4OSAzOC42MjFMOTguMzQ4IDQ0LjI4N0M5OC4wMTIgNDIuOTQzIDk3LjYxIDQxLjYwNCA5Ny4xNDggNDAuMzAyQzkwLjk0MiAyMi43NDcgNzQuMzE3IDEwLjk0NyA1NS43OSAxMC45NDdDMzEuNTkxIDEwLjk0NyAxMS45MDUgMzAuNzExIDExLjkwNSA1NUMxMS45MDUgNzkuMjg5IDMxLjU5MSA5OS4wNTMgNTUuNzkgOTkuMDUzQzY1LjE5NCA5OS4wNTMgNzQuMTYyIDk2LjEgODEuNzMgOTAuNTA3Qzg5LjE0MiA4NS4wMjcgOTQuNTc5IDc3LjUxOSA5Ny40NTQgNjguNzk5TDk3LjQ4NCA2OC42MDdMNDQuMzAyIDM4LjA2NFY3MS4xODJMNjIuNjM3IDYwLjU3N0w3Mi4wNzggNjUuOTkxTDQ0LjU5NiA4MS44ODlMMzQuODc5IDc2LjMzMVYzMi45NzRMNDQuNTg0IDI3LjM2Mkw2My45NzYgMzguNDg5TDYzLjk3IDM4LjQ4M0g2My45NzFaIiBmaWxsPSJ3aGl0ZSIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMTFfNDU2KSI+CjxwYXRoIGQ9Ik0yMzAgOTBDMjMwIDEwMS4wNDYgMjIxLjA0NiAxMTAgMjEwIDExMEMyMDUuOTQyIDExMCAyMDIuMTY2IDEwOC43OTIgMTk5LjAxMyAxMDYuNzE1QzE5NS44NiAxMDQuNjM4IDE5My4zMjkgMTAxLjY5MiAxOTEuNzYyIDk4LjIxOUwxNzcuMjggNjYuMTMxQzE3Ni44ODggNjUuMjYzIDE3Ni4wMTYgNjQuNjU4IDE3NS4wMDEgNjQuNjU4QzE3My45ODYgNjQuNjU4IDE3My4xMTMgNjUuMjY0IDE3Mi43MjIgNjYuMTMzTDE1OC4yNCA5OC4yMTlDMTU1LjEwNSAxMDUuMTY2IDE0OC4xMTggMTEwIDE0MC4wMDEgMTEwQzEyOC45NTYgMTEwIDEyMC4wMDEgMTAxLjA0NiAxMjAuMDAxIDkwQzEyMC4wMDEgODUuOTQyIDEyMS4yMSA4Mi4xNjYgMTIzLjI4NyA3OS4wMTNDMTI1LjM2NCA3NS44NiAxMjguMzEgNzMuMzMgMTMxLjc4MyA3MS43NjJMMTYzLjg3MSA1Ny4yOEMxNjQuNzM5IDU2Ljg4OCAxNjUuMzQzIDU2LjAxNSAxNjUuMzQzIDU1QzE2NS4zNDMgNTMuOTg1IDE2NC43MzggNTMuMTEyIDE2My44NjkgNTIuNzIxTDEzMS43ODIgMzguMjM5QzEyNC44MzUgMzUuMTA0IDEyMCAyOC4xMTcgMTIwIDIwQzEyMCA4Ljk1NSAxMjguOTU1IDAgMTQwIDBDMTQ0LjA1OSAwIDE0Ny44MzUgMS4yMDkgMTUwLjk4OCAzLjI4NkMxNTQuMTQxIDUuMzYzIDE1Ni42NzEgOC4zMDggMTU4LjIzOSAxMS43ODJMMTcyLjcyMSA0My44N0MxNzMuMTEzIDQ0LjczOCAxNzMuOTg2IDQ1LjM0MiAxNzUgNDUuMzQyQzE3Ni4wMTQgNDUuMzQyIDE3Ni44ODkgNDQuNzM3IDE3Ny4yOCA0My44NjhMMTkxLjc2MiAxMS43ODJDMTk0Ljg5NyA0LjgzNSAyMDEuODg0IDAgMjEwIDBDMjIxLjA0NiAwIDIzMCA4Ljk1NSAyMzAgMjBDMjMwIDI0LjA1OCAyMjguNzkxIDI3LjgzNCAyMjYuNzE0IDMwLjk4OEMyMjQuNjM3IDM0LjE0MSAyMjEuNjkyIDM2LjY3MiAyMTguMjE5IDM4LjIzOUwxODYuMTMzIDUyLjcyMUMxODUuMjY0IDUzLjExMiAxODQuNjU4IDUzLjk4NSAxODQuNjU4IDU1QzE4NC42NTggNTYuMTQgMTg1LjM4NiA1Ni45NDMgMTg2LjEzMSA1Ny4yOEwyMTguMjE5IDcxLjc2MkMyMjUuMTY1IDc0Ljg5NyAyMzAgODEuODg0IDIzMCA5MFoiIGZpbGw9IiM0RERBNzkiLz4KPC9nPgo8cGF0aCBkPSJNMTIuNTAxIDEyNUM1LjU5NyAxMjUgMC4wMDEgMTMwLjU5NiAwLjAwMSAxMzcuNUMwLjAwMSAxNDQuNDA0IDUuNTk3IDE1MCAxMi41MDEgMTUwSDc1LjQyMkw5LjA5NCAxOTMuMjMzQzMuNjE5IDE5Ni44MDIgMCAyMDIuOTc4IDAgMjEwQzAgMjIxLjA0NiA4Ljk1NCAyMzAgMjAgMjMwQzI3LjAyMiAyMzAgMzMuMTk4IDIyNi4zOCAzNi43NjYgMjIwLjkwNkw4MC4wMDEgMTU0LjU3OVYyMTcuNUM4MC4wMDEgMjI0LjQwNCA4NS41OTcgMjMwIDkyLjUwMSAyMzBDOTkuNDA1IDIzMCAxMDUuMDAxIDIyNC40MDQgMTA1LjAwMSAyMTcuNVYxMjVIMTIuNTAxWiIgZmlsbD0iI0VBM0I5QyIvPgo8cGF0aCBkPSJNMTc3LjUgMTIwQzE0OC41MDUgMTIwIDEyNSAxNDMuNTA1IDEyNSAxNzIuNVYyMjVIMTc3LjVDMjA2LjQ5NSAyMjUgMjMwIDIwMS40OTUgMjMwIDE3Mi41QzIzMCAxNDMuNTA1IDIwNi40OTUgMTIwIDE3Ny41IDEyMFoiIGZpbGw9IiNGNEI2MzUiLz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTFfNDU2Ij4KPHJlY3Qgd2lkdGg9IjExMCIgaGVpZ2h0PSIxMTAiIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjApIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==&query=download_count&suffix=%20Downloads&label=Marketplace&labelColor=151515&color=204cfe&url=https://mp-gateway.elgato.com/organizations/${orgId}/products/${productId}`;
  const placeholderBadge = createBadgeElement(
    placeholderBadgeUrl,
    marketplaceLink
  );

  const dynamicBadgeUrl = `https://img.shields.io/badge/dynamic/json?logo=data:image/svg%2Bxml;base64,PHN2ZyB3aWR0aD0iMjMwIiBoZWlnaHQ9IjIzMCIgdmlld0JveD0iMCAwIDIzMCAyMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02My45NzEgMzguNDgzTDY0LjA5MSAzOC41NzNMMTA5LjY5MiA2NC43NzdDMTA3LjQ1MyA3Ny4yODUgMTAwLjg5NCA4OC43MTIgOTEuMTgzIDk2Ljk3NkM4MS4zMTYgMTA1LjM3MyA2OC43NDkgMTEwIDU1Ljc5MSAxMTBDNDEuMTU5IDExMCAyNy40MDMgMTA0LjI4IDE3LjA1IDkzLjg5MUM2LjcwMiA4My41MDIgMSA2OS42ODYgMSA1NUMxIDQwLjMxNCA2LjcwMiAyNi40OTggMTcuMDQ5IDE2LjEwOUMyNy4zOTYgNS43MiA0MS4xNTIgMCA1NS43OSAwQzY2Ljk3MSAwIDc3LjcyIDMuMzYxIDg2Ljg3OSA5LjcxMUM5NS44MjggMTUuOTE3IDEwMi42NzYgMjQuNTQxIDEwNi42OTEgMzQuNjU0QzEwNy4yMDEgMzUuOTUgMTA3LjY3NSAzNy4yODMgMTA4LjA4OSAzOC42MjFMOTguMzQ4IDQ0LjI4N0M5OC4wMTIgNDIuOTQzIDk3LjYxIDQxLjYwNCA5Ny4xNDggNDAuMzAyQzkwLjk0MiAyMi43NDcgNzQuMzE3IDEwLjk0NyA1NS43OSAxMC45NDdDMzEuNTkxIDEwLjk0NyAxMS45MDUgMzAuNzExIDExLjkwNSA1NUMxMS45MDUgNzkuMjg5IDMxLjU5MSA5OS4wNTMgNTUuNzkgOTkuMDUzQzY1LjE5NCA5OS4wNTMgNzQuMTYyIDk2LjEgODEuNzMgOTAuNTA3Qzg5LjE0MiA4NS4wMjcgOTQuNTc5IDc3LjUxOSA5Ny40NTQgNjguNzk5TDk3LjQ4NCA2OC42MDdMNDQuMzAyIDM4LjA2NFY3MS4xODJMNjIuNjM3IDYwLjU3N0w3Mi4wNzggNjUuOTkxTDQ0LjU5NiA4MS44ODlMMzQuODc5IDc2LjMzMVYzMi45NzRMNDQuNTg0IDI3LjM2Mkw2My45NzYgMzguNDg5TDYzLjk3IDM4LjQ4M0g2My45NzFaIiBmaWxsPSJ3aGl0ZSIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMTFfNDU2KSI+CjxwYXRoIGQ9Ik0yMzAgOTBDMjMwIDEwMS4wNDYgMjIxLjA0NiAxMTAgMjEwIDExMEMyA1LjE0MiAxMDguNzkyIDEwOC43OTIgMTk5LjAxMyAxMDYuNzE1QzE5NS44NiAxMDQuNjM4IDE5My4zMjkgMTAxLjY5MiAxOTEuNzYyIDk4LjIxOUwxNzcuMjggNjYuMTMxQzE3Ni44ODggNjUuMjYzIDE3Ni4wMTYgNjQuNjU4IDE3NS4wMDEgNjQuNjU4QzE3My45ODYgNjQuNjU4IDE3My4xMTMgNjUuMjY0IDE3Mi43MjIgNjYuMTMzTDE1OC4yNCA5OC4yMTlDMTU1LjEwNSAxMDUuMTY2IDE0OC4xMTggMTEwIDE0MC4wMDEgMTEwQzEyOC45NTYgMTEwIDEyMC4wMDEgMTAxLjA0NiAxMjAuMDAxIDkwQzEyMC4wMDEgODUuOTQyIDEyMS4yMSA4Mi4xNjYgMTIzLjI4NyA3OS4wMTNDMTI1LjM2NCA3NS44NiAxMjguMzEgNzMuMzMgMTMxLjc4MyA3MS43NjJMMTYzLjg3MSA1Ny4yOEMxNjQuNzM5IDU2Ljg4OCAxNjUuMzQzIDU2LjAxNSAxNjUuMzQzIDU1QzE2NS4zNDMgNTMuOTg1IDE2NC43MzggNTMuMTEyIDE2My44NjkgNTIuNzIxTDEzMS43ODIgMzguMjM5QzEyNC44MzUgMzUuMTA0IDEyMCAyOC4xMTcgMTIwIDIwQzEyMCA4Ljk1NSAxMjguOTU1IDAgMTQwIDBDMTQ0LjA1OSAwIDE0Ny44MzUgMS4yMDkgMTUwLjk4OCAzLjI4NkMxNTQuMTQxIDUuMzYzIDE1Ni42NzEgOC4zMDggMTU4LjIzOSAxMS43ODJMMTcyLjcyMSA0My44N0MxNzMuMTEzIDQ0LjczOCAxNzMuOTg2IDQ1LjM0MiAxNzUgNDUuMzQyQzE3Ni4wMTQgNDUuMzQyIDE3Ni44ODkgNDQuNzM3IDE3Ny4yOCA0My44NjhMMTkxLjc2MiAxMS43ODJDMTk0Ljg5NyA0LjgzNSAyMDEuODg0IDAgMjEwIDBDMjIxLjA0NiAwIDIzMCA4Ljk1NSAyMzAgMjBDMjMwIDI0LjA1OCAyMjguNzkxIDI3LjgzNCAyMjYuNzE0IDMwLjk4OEMyMjQuNjM3IDM0LjE0MSAyMjEuNjkyIDM2LjY3MiAyMTguMjE5IDM4LjIzOUwxODYuMTMzIDUyLjcyMUMxODUuMjY0IDUzLjExMiAxODQuNjU4IDUzLjk4NSAxODQuNjU4IDU1QzE4NC42NTggNTYuMTQgMTg1LjM4NiA1Ni45NDMgMTg2LjEzMSA1Ny4yOEwyMTguMjE5IDcxLjc2MkMyMjUuMTY1IDc0Ljg5NyAyMzAgODEuODg0IDIzMCA5MFoiIGZpbGw9IiM0RERBNzkiLz4KPC9nPgo8cGF0aCBkPSJNMTIuNTAxIDEyNUM1LjU5NyAxMjUgMC4wMDEgMTMwLjU5NiAwLjAwMSAxMzcuNUMwLjAwMSAxNDQuNDA0IDUuNTk3IDE1MCAxMi41MDEgMTUwSDc1LjQyMiw5LjA5NCAxOTMuMjMzQzMuNjE5IDE5Ni44MDIgMCAyMDIuOTc4IDAgMjEwQzAgMjIxLjA0NiA4Ljk1NCAyMzAgMjAgMjMwQzI3LjAyMiAyMzAgMzMuMTk4IDIyNi4zOCAzNi43NjYgMjIwLjkwNkw4MC4wMDEgMTU0LjU3OVYyMTcuNUM4MC4wMDEgMjI0LjQwNCA4NS41OTcgMjMwIDkyLjUwMSAyMzBDOTkuNDA1IDIzMCAxMDUuMDAxIDIyNC40MDQgMTA1LjAwMSAyMTcuNVYxMjVIMTIuNTAxWiIgZmlsbD0iI0VBM0I5QyIvPgo8cGF0aCBkPSJNMTc3LjUgMTIwQzE0OC41MDUgMTIwIDEyNSAxNDMuNTA1IDEyNSAxNzIuNVYyMjVIMTc3LjVDMjA2LjQ5NSAyMjUgMjMwIDIwMS40OTUgMjMwIDE3Mi41QzIzMCAxNDMuNTA1IDIwNi40OTUgMTIwIDE3Ny41IDEyMFoiIGZpbGw9IiNGNEI2MzUiLz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTFfNDU2Ij4KPHJlY3Qgd2lkdGg9IjExMCIgaGVpZ2h0PSIxMTAiIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjApIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==&query=download_count&suffix=%20Downloads&label=Marketplace&labelColor=151515&color=204cfe&url=https%3A%2F%2Fmp-gateway.elgato.com%2Forganizations%2F${orgId}%2Fproducts%2F${productId}`;

  const dynamicBadge = createBadgeElement(dynamicBadgeUrl, marketplaceLink);

  badgeContainer.appendChild(placeholderBadge);
  badgeContainer.appendChild(dynamicBadge);
}

function createBadgeElement(badgeUrl, marketplaceUrl) {
  const badgeLink = document.createElement("a");
  badgeLink.href = marketplaceUrl;

  const badgeImage = document.createElement("img");
  badgeImage.src = badgeUrl;
  badgeImage.alt = "Badge";

  const embedCode = document.createElement("div");
  embedCode.className = "code";
  embedCode.textContent = `<a href="${marketplaceUrl}"><img src="${badgeUrl}" alt="Badge"></a>`;

  const markdownCode = document.createElement("div");
  markdownCode.className = "code markdown";
  markdownCode.textContent = `[![Marketplace download badge](${badgeUrl} "Marketplace download badge")](${marketplaceUrl})`;

  const copyMarkdownButton = document.createElement("button");
  copyMarkdownButton.textContent = "Copy Markdown Badge";
  copyMarkdownButton.onclick = () => copyMarkdown(badgeUrl, marketplaceUrl);

  const copyButton = document.createElement("button");
  copyButton.textContent = "Copy HTML Badge";
  copyButton.onclick = () => copyCode(badgeUrl, marketplaceUrl);

  const badgeDiv = document.createElement("div");
  badgeDiv.className = "badge";
  badgeLink.appendChild(badgeImage);
  badgeDiv.appendChild(badgeLink);
  badgeDiv.appendChild(embedCode);
  badgeDiv.appendChild(markdownCode);
  badgeDiv.appendChild(copyButton);
  badgeDiv.appendChild(copyMarkdownButton);

  return badgeDiv;
}

function copyCode(badgeUrl, marketplaceUrl) {
  const codeElement = document.createElement("textarea");
  codeElement.value = `<a href="${marketplaceUrl}"><img src="${badgeUrl}" alt="Badge" /></a>`;
  document.body.appendChild(codeElement);
  codeElement.select();
  document.execCommand("copy");
  document.body.removeChild(codeElement);

  alert("Badge code copied to clipboard!");
}

function copyMarkdown(badgeUrl, marketplaceUrl) {
  const codeElement = document.createElement("textarea");
  codeElement.value = `[![Marketplace download badge](${badgeUrl} "Marketplace download badge")](${marketplaceUrl})`;
  document.body.appendChild(codeElement);
  codeElement.select();
  document.execCommand("copy");
  document.body.removeChild(codeElement);

  alert("Markdown code copied to clipboard!");
}
