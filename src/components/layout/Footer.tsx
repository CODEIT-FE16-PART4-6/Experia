import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-nomad-black w-full text-gray-800'>
      <div className='flex w-full flex-wrap justify-between px-[38px] pt-8 pb-16 md:flex-nowrap md:px-[110px] md:pb-[108px] lg:mx-auto lg:w-[1200px]'>
        <span>&#169; 2025 Experia.</span>
        <div className='flex gap-4 md:gap-[30px]'>
          <Link href='/' className='transition-colors hover:text-white'>
            Privacy Policy
          </Link>
          <Link href='/' className='transition-colors hover:text-white'>
            FAQ
          </Link>
        </div>
        <div className='mt-6 flex w-full justify-start gap-3 sm:mt-0 sm:w-auto'>
          <a
            href='https://www.facebook.com/'
            target='_blank'
            rel='noopener'
            title='클릭 시 페이스북으로 이동합니다.'
          >
            <Image src='/icons/ic_Facebook.svg' alt='페이스북 로고' width={20} height={20} />
          </a>
          <a
            href='https://x.com/?lang=ko'
            target='_blank'
            rel='noopener'
            title='클릭 시 트위터로 이동합니다.'
          >
            <Image src='/icons/ic_Twitter.svg' alt='트위터 로고' width={20} height={20} />
          </a>
          <a
            href='https://www.youtube.com/'
            target='_blank'
            rel='noopener'
            title='클릭 시 유튜브로 이동합니다.'
          >
            <Image src='/icons/ic_Youtube.svg' alt='유튜브 로고' width={20} height={20} />
          </a>
          <a
            href='https://www.instagram.com/'
            target='_blank'
            rel='noopener'
            title='클릭 시 인스타그램으로 이동합니다.'
          >
            <Image src='/icons/ic_Instagram.svg' alt='인스타그램 로고' width={20} height={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
