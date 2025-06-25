import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

const NewzLatter = () => {
  const handlesubscribe = (e) => {
    e.preventDefault();
    const form= e.target;
    const email = form.email.value;
    console.log(email);
    
    axios.post(`${import.meta.env.VITE_API_URL}/subscribers`, { email })
      .then(response => {
        if (response.data.insertedId) {
         Swal.fire({
        position: "center",
        icon: "success",
        title: "Subscribed successfully!",
        text: "You will receive updates to your email.",
        showConfirmButton: false,
        timer: 1500
      });
          form.reset();
        }
      })
      .catch(error => {
        console.error('Error subscribing:', error);
        // alert('Subscription failed. Please try again later.');
      });
  }
    return (
        <div className='border-t-4 border-gray-50'>
            <section class="bg-gray-100 py-20 px-4 md:px-10">
  <div class="max-w-2xl mx-auto text-center">
    <h2 class="text-3xl font-bold text-gray-800 mb-4">📰 Stay in the Loop with Devscoop</h2>
    <p class="text-gray-600 mb-6">
      Get weekly updates on trending dev tools, coding tips, project ideas & community highlights. No spam. Just good stuff.
    </p>
    <form onSubmit={handlesubscribe} class="flex flex-col sm:flex-row items-center justify-center gap-3">
      <input 
        type="email" 
        name='email'
        placeholder="Enter your email" 
        class="w-full sm:w-auto px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
        required 
      />
      <button 
        type="submit" 
        class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
      >
        Subscribe
      </button>
    </form>
    <p class="text-sm text-gray-500 mt-4 text-center">No spam! Unsubscribe anytime.</p>
  </div>
</section>

        </div>
    );
};

export default NewzLatter;