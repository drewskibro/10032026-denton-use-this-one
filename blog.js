document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.healthhub-filter-btn');
  const articles = document.querySelectorAll('.healthhub-article-card');

  // Function to filter articles
  function filterArticles(category) {
    articles.forEach(article => {
      const badge = article.querySelector('.healthhub-category-badge-overlay');
      const articleCategory = badge ? badge.textContent.trim() : '';

      // Reset animation
      article.style.animation = 'none';
      article.offsetHeight; /* trigger reflow */
      article.style.animation = null; 

      if (category === 'All Articles' || articleCategory === category) {
        article.style.display = 'flex';
        // Add a subtle fade-in animation
        article.style.animation = 'fadeInUp 0.5s ease forwards';
      } else {
        article.style.display = 'none';
      }
    });
  }

  // Add click event listeners to buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get the category text
      const selectedCategory = this.textContent.trim();
      
      // Filter the articles
      filterArticles(selectedCategory);
    });
  });
});
