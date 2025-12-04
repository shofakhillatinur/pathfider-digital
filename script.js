const library=[
  {id:'B001',title:'Ringkasan Fiqh Ibadah',author:'H. Ahmad Nur',callNumber:'297.1/Fiq-I',year:2015,category:'fiqh',synopsis:'Pembahasan ibadah pokok seperti shalat, wudhu, dan puasa.',subjects:[{name:'Shalat',pages:['12-20','45'],notes:'Panduan praktik'},{name:'Wudhu',pages:['9-11'],notes:'Teknis wudhu'}]},
  {id:'B002',title:'Aqidah dan Dasar-dasar Tauhid',author:'Siti Maryam',callNumber:'297.2/Aqid',year:2018,category:'aqidah',synopsis:'Penjelasan prinsip tauhid dan syirik.',subjects:[{name:'Tauhid',pages:['1-30'],notes:'Konsep dasar'},{name:'Syirik',pages:['31-40'],notes:'Contoh bentuk syirik'}]},
  {id:'B003',title:'Kumpulan Hadis Pilihan',author:'Dr. Hasan Al-Banna',callNumber:'297.3/Hadis',year:2010,category:'hadis',synopsis:'Hadis tematik tentang akhlak dan sunnah.',subjects:[{name:'Akhlak',pages:['5','26-28'],notes:'Hadis akhlak'}]},
  {id:'B004',title:'Sejarah Islam Awal',author:'Mahmud Khalil',callNumber:'297.9/Sej',year:2019,category:'sejarah',synopsis:'Sejarah dakwah Rasul hingga Khulafaur Rasyidin.',subjects:[{name:'Masa Rasulullah',pages:['1-40'],notes:'Sejarah dakwah'}]},
  {id:'B005',title:'Tafsir Surah Al-Baqarah',author:'Ust. Rahmatullah',callNumber:'297.4/Taf',year:2020,category:'tafsir',synopsis:'Tafsir ayat lengkap dan asbabun nuzul.',subjects:[{name:'Tafsir',pages:['5-60'],notes:'Makna ayat'}]}
];

function normalize(s){
  return s.toString().toLowerCase();
}

function search(query,cat=null){
  const q=normalize(query).trim();
  return library.filter(b=>{
    const matchCat = cat ? b.category===cat : true;
    const matchQuery = q ?
      normalize(b.title).includes(q) ||
      normalize(b.synopsis).includes(q) ||
      b.subjects.some(s=>normalize(s.name).includes(q)) : true;

    return matchCat && matchQuery;
  });
}

const resultsEl=document.getElementById('results');

function render(books){
  resultsEl.innerHTML='';

  if(!books.length){
    resultsEl.innerHTML='<div class="meta">Tidak ada hasil ditemukan.</div>';
    return;
  }

  books.forEach(book=>{
    const card=document.createElement('div');
    card.className='card';

    let html=`
      <div class="subject">${book.title}</div>
      <div class="meta">${book.callNumber} • ${book.author} • ${book.year}</div>

      <div class="sinopsis-collapsible">Sinopsis</div>
      <div class="sinopsis-panel">${book.synopsis}</div>
    `;

    book.subjects.forEach(t=>{
      html += `
        <div class="topic">
          <div>
            <strong>${t.name}</strong><br>
            <small>${t.notes}</small>
          </div>
          <small>Hal: ${t.pages.join(', ')}</small>
        </div>
      `;
    });

    card.innerHTML=html;
    resultsEl.appendChild(card);
  });

  document.querySelectorAll('.sinopsis-collapsible').forEach(acc=>{
    acc.addEventListener('click',()=>{
      const panel = acc.nextElementSibling;
      panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";
    });
  });
}

document.getElementById('btn').addEventListener('click',()=>{
  const q=document.getElementById('q').value;
  render(search(q));
});

document.querySelectorAll('.panel button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    render(search('',btn.dataset.cat));
  });
});

document.querySelectorAll('.accordion').forEach(acc=>{
  acc.addEventListener('click',()=>{
    const panel = acc.nextElementSibling;
    panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";
  });
});

// load semua buku saat awal dibuka
render(library);
