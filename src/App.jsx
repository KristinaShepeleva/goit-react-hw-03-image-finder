import React, { Component } from 'react';
import Notiflix from 'notiflix';

import { fetchImg } from 'components/fetchImg';
import Container from 'components/Container/Container'
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';


let page = 1;

class App extends Component {
   state = {
    searchValue: '',
    images: [],

    status: 'idle',
    totalImages: 0,
  };


  handleSubmit = async searchValue => {
    page = 1;
    if (searchValue.trim() === '') {
      Notiflix.Notify.info('The search field is empty, please try again.');
      return;
    } else {
      try {
      this.setState({ status: 'pending' });
      const images = await fetchImg(searchValue, page);
      console.log(images.hits);
      if (images.hits.length < 1) {
        this.setState({ status: 'idle' });
           Notiflix.Notify.failure(
             'Sorry, there are no images for your search query. Please try again.'
           );
      } else {
        this.setState({
             images: images.hits,
             searchValue,
             totalImages: images.totalHits,
             status: 'resolved',
        });
        Notiflix.Notify.success(`We find ${images.totalHits} images`);
         }
    } catch (error) {
        this.setState({ status: 'rejected' });
        Notiflix.Notify.failure(
             'Sorry, something went wrong. Please try again.'
           );
       }
    }
  };

onNextPage = async () => {
    this.setState({ status: 'pending' });

  try {
   
    const images = await fetchImg(this.state.searchValue, (page += 1));
    console.log(images.hits);
      this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
      Notiflix.Notify.failure(
             'Sorry, something went wrong. Please try again.'
           );
    }
  };


  render() {
    const { totalImages, status, images } = this.state;
 
    if (status === 'idle') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleSubmit} />
        </Container>
      );
    }
    
    if (status === 'pending') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleSubmit} />
          <Loader />
          <ImageGallery page={page} images={this.state.images} />
          {totalImages > 12 && <Button onClick={this.onNextPage} />}
          
       </Container>
      );
    }

    if (status === 'resolved') {
      return (
       <Container>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} images={this.state.images} />
          {totalImages > 12 && totalImages > images.length && (
            <Button onClick={this.onNextPage} />
          )}
        </Container>
      );
    }
   
    if (status === 'rejected') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleSubmit} />
          <p>Sorry, something went wrong. Please try again.</p>
        </Container>
      );
    }

  }
}



export default App;
