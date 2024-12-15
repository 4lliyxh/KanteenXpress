function showWorkout() {
    const calorieInput = document.getElementById('calorieInput').value;
    const videoContainer = document.getElementById('videoContainer');

    // Aangepaste video-URL's voor de juiste calorieën
    const workouts = {
        50: 'https://www.youtube.com/embed/cb2BuW0bMow', // 5 minuten, 50 calorieën (video die je hebt opgegeven)
        100: 'https://www.youtube.com/embed/5fb38J9B7Jk', // 7 minuten, 100 calorieën
        200: 'https://www.youtube.com/embed/Jru5B044HOs', // 7 minuten, 200 calorieën
        300: 'https://www.youtube.com/embed/PJ_Jt_9Ylqg', // 20 minuten, 300 calorieën (HIIT)
        400: 'https://www.youtube.com/embed/c4niL9cHPMc', // Nieuwe video voor 400 calorieën
        500: 'https://www.youtube.com/embed/RcLz_atcq8w', // 20 minuten, 500 calorieën (HIIT)
    };

    if (calorieInput && workouts[calorieInput]) {
        videoContainer.innerHTML = `<iframe src="${workouts[calorieInput]}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`;
    } else {
        videoContainer.innerHTML = '<p style="color: red;">Selecteer een geldig aantal calorieën.</p>';
    }
}