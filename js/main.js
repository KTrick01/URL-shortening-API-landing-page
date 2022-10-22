const btn = document.querySelector('.shortBtn');
const linksArea = document.querySelector('.short__area');
const linksAreaParent = document.querySelector('.short');
btn.addEventListener('click', () => {
	const input = document.querySelector('#link');
	const link = document.querySelector('#link').value;
	const errorMsg = document.querySelector('.errorMsg');

	const shortCont = document.createElement('div');
	const linksCont = document.createElement('p');
	const originalCont = document.createElement('p');
	const copyBtn = document.createElement('button');
	fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
		.then((response) => response.json())
		.then(function (json) {
			console.log(json);

			if (!link.length) {
				input.classList.add('error');

				errorMsg.textContent = 'Please add a link';
				errorMsg.style.display = 'block';
				errorMsg.style.animation = 'test .2s both';
			} else if (json.ok === false) {
				input.classList.add('error');
				errorMsg.textContent = `${json.error}`;
				errorMsg.style.display = 'block';
				errorMsg.style.animation = 'test .2s both';
			} else {
				errorMsg.style.display = 'none';
				input.classList.remove('error');
				const originalLink = document.createTextNode(
					`${json.result.original_link}`
				);
				const shortLink = document.createTextNode(`${json.result.short_link}`);

				originalCont.appendChild(originalLink);
				shortCont.appendChild(originalCont);

				linksCont.appendChild(shortLink);
				shortCont.appendChild(linksCont);

				copyBtn.textContent = 'Copy';
				shortCont.appendChild(copyBtn);

				copyBtn.classList.add('cyan-btn');
				shortCont.classList.add('links');
				linksCont.classList.add('shortenLink');

				const allLinks = document.querySelectorAll('.links');

				//Removes the last short link when there's more than 3
				if (allLinks.length > 3) {
					allLinks[allLinks.length - 1].style.animation = 'remove .5s both';

					allLinks[allLinks.length - 1].addEventListener('animationend', () => {
						allLinks[allLinks.length - 1].remove();
						linksArea.after(shortCont);
					});
				} else {
					linksArea.after(shortCont);
				}

				copyBtn.addEventListener('click', () => {
					navigator.clipboard.writeText(json.result.short_link);

					copyBtn.textContent = 'Copied!';
					copyBtn.classList.add('copied');
				});
			}
		});
});
