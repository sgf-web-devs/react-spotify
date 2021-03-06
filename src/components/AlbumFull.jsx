import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Track from './Track';
import '../css/AlbumFull.css';

class AlbumFull extends Component {
  
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClickClose();
  }

  renderTracks() {
    const { album, isTrackSelected } = this.props;
    const { tracks } = album;

    if (tracks && tracks.items && tracks.items.length) {

      const elements = tracks.items.map(
        (track) => {
          return <Track key={track.id} 
                    track={track}
                    selected={isTrackSelected(track.id)}
                    playTrack={this.props.playTrack}
                    stopTrack={this.props.stopTrack} />
        }
      );

      return (
        <div className="tracks">{elements}</div>
      );
    }

    return (
      <h4>No tracks found</h4>
    );
  }

  render() {
    const { album, id } = this.props;
    const { name, release_date, images } = album;

    const releaseYear = (release_date || '    ').substr(0, 4);
    const thumb = images.sort((a, b) => { return a.width - b.width; })[1]; // get medium sized image

    return (
      <div className="AlbumFull" id={id}>
        <FontAwesome className="close" name="close" onClick={this.onClick} />
        <img src={thumb.url} alt={id} />
        <h2 className="title">{name}</h2>
        <span className="released">{releaseYear}</span>
        { this.renderTracks() }
      </div>
    );
  }
}

export default AlbumFull;
