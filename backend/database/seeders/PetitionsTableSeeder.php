<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PetitionsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('petitions')->insert([
            [
                'user_id' => 1, 
                'title' => 'Kepolisian Harus Stop Penggunaan Gas Air Mata!', 
                'description' => 'Stop Penggunaan Gas Air Mata atau #RefuseTearGas adalah desakan Publik kepada otoritas keamanan Republik Indonesia untuk tidak menggunakan gas air mata dalam menangani massa. Sertai penolakan-mu dengan mendatangani petisi ini!', 
                'submissionDate' => Carbon::now(), 
                'status' => 'Open',
                'upvotes' => 3159,
                'downvotes' => 50,
                'thumbnail_url' => 'thumbnails/fdHeiWfpLlIkmzZ-800x450-noPad.webp'
            ],
            [
                'user_id' => 1, 
                'title' => 'Diabetes dan Obesitas Mengintai: Lindungi Masyarakat dari Bahaya Minuman Berpemanis', 
                'description' => 'Indonesia sedang mengalami krisis beban kesehatan. Jumlah kasus obesitas dan penyakit tidak menular di Indonesia meningkat signifikan sepuluh tahun terakhir. 
Karena edukasi dan sosialisasi tidak cukup, dibutuhkan kebijakan fiskal yang turut membentuk kebiasaan dan lingkungan yang lebih ramah terhadap pangan sehat, salah satunya cukai MBDK. Tapi, belum diterapkan juga. 
Cukai MBDK adalah cukai yang diberlakukan terhadap minuman berpemanis dalam kemasan dalam bentuk cair, konsentrat, maupun bubuk dan berpemanis (baik berpemanis gula maupun yang mengandung bahan tambahan pemanis yang lain).', 
                'submissionDate' => Carbon::now(), 
                'status' => 'Open',
                'upvotes' => 500,
                'downvotes' => 30,
                'thumbnail_url' => 'thumbnails/dQIhgbiFDKrSwNi-800x450-noPad.webp'
            ],
            [
                'user_id' => 2, 
                'title' => 'Pembatasan Truk di Tol JORR', 
                'description' => 'Tol Lingkar Luar Jakarta (Jakarta Outer Ring Road/JORR) merupakan salah satu jalur utama transportasi antar-wilayah Jabodetabek yang menghubungkan Jakarta dengan wilayah-wilayah sekitarnya. Puluhan ribu masyarakat Jabodetabek tergantung pada jalan tol ini untuk mobilisasi sehari-hari.

Dalam beberapa bulan terakhir, jumlah kendaraan di Tol JORR meningkat pesat. Banyaknya truk besar yang melintasi Tol JORR mengakibatkan kemacetan parah, terutama pada jam-jam sibuk.

Truk-truk besar banyak melakukan pelanggaran aturan lalu-lintas dengan mengambil jalur tengah dan kanan, atau mengangkut muatan di atas kapasitas sehingga tidak dapat berjalan di atas kecepatan minimal 60 km/jam.

Karena itu, kami mempetisi PT. Jalantol Lingkarluar Jakarta (JLJ) selaku operator Tol JORR, PT. Jasa Marga sebagai induk perusahaan PT. JLJ, dan Menteri Perhubungan RI untuk melakukan pembatasan truk yang melintasi Tol JORR.', 
                'submissionDate' => Carbon::now(), 
                'status' => 'Open',
                'upvotes' => 1200,
                'downvotes' => 200,
                'thumbnail_url' => 'thumbnails/EVLczmWIciayqnl-800x450-noPad.jpg'
            ],
            [
                'user_id' => 2, 
                'title' => 'Batalkan Pembangunan 6 Jalan Tol Dalam Kota Jakarta #Tolak6Tol', 
                'description' => 'Pemerintah Provinsi DKI Jakarta akan membangun enam ruas jalan tol mulai 2013 mendatang.

Padahal pembangunan jalan raya baru, termasuk jalan tol dalam kota Jakarta, tidak akan menyelesaikan problem kemacetan lalu lintas di kota. Di California setiap 1% peningkatan panjang jalan dalam setiap mil akan menghasilkan peningkatan kendaraan yang lewat sebesar 0,9% dalam waktu lima tahun (Hanson, 1995).', 
                'submissionDate' => Carbon::now(), 
                'status' => 'Open',
                'upvotes' => 900,
                'downvotes' => 60,
                'thumbnail_url' => 'thumbnails/081537_toldalamkota.jpg'
            ],
            [
                'user_id' => 3, 
                'title' => 'SURAT TERBUKA UNTUK PRESIDEN:Darurat UU Pelarangan Perdagangan Daging Anjing & Kucing', 
                'description' => 'Yang Terhormat Presiden Terpilih Prabowo Subianto,

Kami mohon Anda berjanji untuk segera mengesahkan Peraturan Presiden untuk menghentikan perdagangan daging anjing dan kucing secara nasional.

Kami sangat prihatin dengan jutaan anjing dan kucing yang menderita dalam perdagangan daging di Indonesia, yang mengakibatkan penderitaan hewan, kegiatan ilegal, dan risiko kesehatan manusia dan hewan.', 
                'submissionDate' => Carbon::now(), 
                'status' => 'Open',
                'upvotes' => 450,
                'downvotes' => 50,
                'thumbnail_url' => 'thumbnails/HpDvUQAiaLWocFo-800x450-noPad.jpg'
            ],
        ]);
    }
}
