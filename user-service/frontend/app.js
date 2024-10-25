// login.html için
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.ok) {
                // Kullanıcı başarılı şekilde giriş yaptı, kullanıcı adı ile yönlendir
                localStorage.setItem('username', data.user.name);
                localStorage.setItem('userId', data.user._id);
                window.location.href = 'index.html';
            } else {
                alert('Giriş başarısız: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}


const welcomeMessage = document.getElementById('welcomeMessage');
const candidateList = document.getElementById('candidateList');

if (welcomeMessage) {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');  // Kullanıcı ID'si

    if (username && userId) {
        welcomeMessage.textContent = `Hoşgeldin ${username}`;

        // Kullanıcının daha önce oy verip vermediğini kontrol et
        fetch(`http://localhost:3003/api/vote/check/${userId}`)
            .then(response => response.json())
            .then(data => {
                const hasVoted = data.hasVoted;
                const votedCandidateId = localStorage.getItem('votedCandidateId');  // Oy verilen adayın ID'si

                // Adayları listele
                fetch('http://localhost:3002/api/candidates')  // Aday servisi portu
                    .then(response => response.json())
                    .then(candidates => {
                        candidates.forEach(candidate => {
                            const li = document.createElement('li');
                            li.textContent = `${candidate.name}: ${candidate.description} - Oylar: `;

                            // Oy sayısını göstermek için bir span oluştur
                            const voteCountSpan = document.createElement('span');
                            li.appendChild(voteCountSpan);

                            // Adayın güncel oy sayısını getir
                            fetch(`http://localhost:3003/api/vote/${candidate._id}`)
                                .then(response => response.json())
                                .then(data => {
                                    voteCountSpan.textContent = data.voteCount; // Mevcut oy sayısını ekle
                                })
                                .catch(error => {
                                    console.error('Error fetching vote count:', error);
                                });

                            // Oy verme düğmesini oluştur
                            const voteButton = document.createElement('button');
                            voteButton.textContent = 'Oy Ver';

                            // Eğer kullanıcı zaten oy verdiyse, butonları duruma göre ayarla
                            if (hasVoted) {
                                if (candidate._id === votedCandidateId) {
                                    // Oy verilen adayın butonu yeşil renk ve "Oy Verildi" yazısı ile gösterilsin
                                    voteButton.disabled = true;
                                    voteButton.style.backgroundColor = '#28a745';
                                    voteButton.style.color = 'white';
                                    voteButton.textContent = 'Oy Verildi';
                                } else {
                                    // Diğer adayların butonlarında "Oy Hakkınız Kullanıldı" yazsın
                                    voteButton.disabled = true;
                                    voteButton.style.backgroundColor = '#ccc';
                                    voteButton.textContent = 'Oy Hakkınız Kullanıldı';
                                }
                            } else {
                                // Kullanıcı oy vermemişse, buton aktif
                                voteButton.onclick = () => {
                                    fetch('http://localhost:3003/api/vote', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            userId: userId,
                                            candidateId: candidate._id
                                        })
                                    })
                                    .then(async (response) => {
                                        const data = await response.json();
                                        if (response.ok) {
                                            alert('Oy başarıyla verildi!');

                                            // Oy verilen adayın ID'sini localStorage'a kaydet
                                            localStorage.setItem('votedCandidateId', candidate._id);

                                            // Oy verilen adayın butonunu yeşil yap ve "Oy Verildi" yazdır
                                            voteButton.disabled = true;
                                            voteButton.style.backgroundColor = '#28a745';
                                            voteButton.style.color = 'white';
                                            voteButton.textContent = 'Oy Verildi';

                                            // Diğer butonlarda "Oy Hakkınız Kullanıldı" yazsın
                                            disableAllOtherButtons(voteButton);

                                            // Güncel oy sayısını al ve göster
                                            fetch(`http://localhost:3003/api/vote/${candidate._id}`)
                                                .then(response => response.json())
                                                .then(data => {
                                                    voteCountSpan.textContent = data.voteCount;  // Oy sayısını güncelle
                                                })
                                                .catch(error => {
                                                    console.error('Error fetching updated vote count:', error);
                                                });
                                        } else {
                                            alert(`Oy verilemedi: ${data.message}`);
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error voting:', error);
                                    });
                                };
                            }

                            li.appendChild(voteButton);
                            candidateList.appendChild(li);
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching candidates:', error);
                    });
            })
            .catch(error => {
                console.error('Error checking vote status:', error);
            });
    } else {
        window.location.href = 'login.html'; // Giriş yapılmadıysa login sayfasına yönlendir
    }
}

// Oy verilen aday dışındaki diğer tüm butonları devre dışı bırak ve "Oy Hakkınız Kullanıldı" yaz
function disableAllOtherButtons(selectedButton) {
    const voteButtons = document.querySelectorAll('button');
    voteButtons.forEach(button => {
        if (button !== selectedButton) {
            button.disabled = true;
            button.style.backgroundColor = '#ccc';
            button.textContent = 'Oy Hakkınız Kullanıldı';
        }
    });
}
