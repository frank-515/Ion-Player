// 格式化秒
// Generates By GPT-3.5
function formatSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toFixed(0).padStart(2, '0')}`;
}

const testPlaylist = [
  { id: 1, title: 'Ode to Joy', artist: 'Beethoven', duration: 243, liked: true },
  { id: 2, title: 'Moonlight Sonata', artist: 'Beethoven', duration: 332, liked: false },
  { id: 3, title: 'Für Elise', artist: 'Beethoven', duration: 181, liked: false },
  { id: 4, title: 'Spring', artist: 'Vivaldi', duration: 345, liked: true },
  { id: 5, title: 'Summer', artist: 'Vivaldi', duration: 311, liked: false },
  { id: 6, title: 'Autumn', artist: 'Vivaldi', duration: 330, liked: false },
  { id: 7, title: 'Winter', artist: 'Vivaldi', duration: 288, liked: true },
  { id: 8, title: 'Air on the G String', artist: 'Bach', duration: 358, liked: false },
  { id: 9, title: 'Brandenburg Concerto No. 3', artist: 'Bach', duration: 320, liked: false },
  { id: 10, title: 'Goldberg Variations', artist: 'Bach', duration: 544, liked: true },
  { id: 11, title: 'Toccata and Fugue in D Minor', artist: 'Bach', duration: 535, liked: false },
  { id: 12, title: 'Prelude in C Major', artist: 'Bach', duration: 142, liked: true },
  { id: 13, title: 'Jesu, Joy of Man\'s Desiring', artist: 'Bach', duration: 327, liked: true },
];

const testLibList = [
  { Name: "Bach", Path: "/electron" },
  { Name: "Jay", Path: "/electron" },
  { Name: "Bach", Path: "/electron" },
  { Name: "Jay", Path: "/electron" },
  { Name: "Bach", Path: "/electron" },
  { Name: "Jay", Path: "/electron" },
];
const testPlaylistDetails = {
  playlist: [
    { id: 1, title: 'Allegro ma non troppo, un poco maestoso', cover: './assets/cover.png', artist: 'Ludwig van Beethoven' },
    { id: 2, title: 'Molto vivace', cover: '@/assets/cover.png', artist: 'Ludwig van Beethoven' },
    { id: 3, title: 'Adagio molto e cantabile', cover: '@/assets/cover.png', artist: 'Ludwig van Beethoven' },
    { id: 4, title: 'Presto - Allegro assai', cover: '@/assets/cover.png', artist: 'Ludwig van Beethoven' }
  ],
  playlistName: 'Symphony No. 9',
  description: `
  The Symphony No. 9 in D minor, Op. 125, is a choral symphony, the final complete symphony by Ludwig van Beethoven, composed between 1822 and 1824. 
  It was first performed in Vienna on 7 May 1824.
  The symphony is regarded by many critics and musicologists as Beethoven's greatest work and one of the supreme achievements in the history of music.`
}


export {
  formatSeconds, testPlaylist, testLibList, testPlaylistDetails
}

