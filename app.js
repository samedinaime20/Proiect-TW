document.addEventListener('DOMContentLoaded', function() {
    fetchPublications();
});

function fetchPublications() {
    fetch('http://localhost:3000/publications')
        .then(response => response.json())
        .then(data => {
            displayPublications(data);
            window.publications = data; 
        })
        .catch(error => console.error('Error:', error));
}

function displayPublications(data) {
    const container = document.getElementById('publications');
    container.innerHTML = ''; // Golim containerul înainte de a adăuga noile publicații
    data.forEach(publication => {
        const div = document.createElement('div');
        div.className = 'publication';
        div.innerHTML = `<h3>${publication.title}</h3><p>${publication.authors.join(', ')}</p>`;
        container.appendChild(div);
    })};

function searchPublications() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredPublications = window.publications.filter(publication => 
        publication.title.toLowerCase().includes(searchTerm) ||
        publication.authors.some(author => author.toLowerCase().includes(searchTerm))
    );
    displayPublications(filteredPublications);
}
const { Sequelize } = require('sequelize');

// Conexiunea la baza de date
const sequelize = new Sequelize('postgres://user:password@localhost:5432/mydatabase');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importarea modelelor
db.Researcher = require('./researcher')(sequelize, Sequelize);
db.Publication = require('./publication')(sequelize, Sequelize);

// Asocierea (Researcher -> Publication)
db.Researcher.hasMany(db.Publication, { as: 'publications' });
db.Publication.belongsTo(db.Researcher, {
    foreignKey: 'researcherId',
    as: 'researcher',
});

module.exports = db;
