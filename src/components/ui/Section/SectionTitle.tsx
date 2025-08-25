interface SectionTitleProps {
  title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
  return <h2 className='mb-8 text-4xl font-bold text-black'>{title}</h2>;
};

export default SectionTitle;
