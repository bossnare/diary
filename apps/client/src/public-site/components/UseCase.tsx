import { GraduationCap, PencilRuler, CirclePile, Pickaxe } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

type Props = {
  title?: string;
  content?: string;
  Icon?: React.ElementType;
};

function Card({ title, content, Icon }: Props) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.9 }}
      variants={{
        hidden: { opacity: 0, y: -1 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="p-4 space-y-4 transition-all duration-100 ease-in-out border rounded-md card hover:shadow-sm lg:duration-300 will-change-transform active:brightness-105 lg:hover:brightness-98 dark:lg:hover:brightness-130 dark:border-input/30 bg-background dark:bg-card/50"
    >
      <header className="flex flex-col items-center gap-3 md:flex-row">
        {Icon ? <Icon sr-only /> : null}
        <h3 className="space-y-3 text-xl font-semibold tracking-tight md:text-lg scroll-m-20">
          {title}
        </h3>
      </header>
      <p className="text-center text-secondary/80 md:text-left md:text-sm">
        {content}
      </p>
    </motion.article>
  );
}

export const UseCase = () => {
  const { t } = useTranslation();
  const cardContents = [
    {
      title: t('section.useCase.card1.title'),
      content: t('section.useCase.card1.description'),
      icon: GraduationCap,
    },
    {
      title: t('section.useCase.card2.title'),
      content: t('section.useCase.card2.description'),
      icon: PencilRuler,
    },
    {
      title: t('section.useCase.card3.title'),
      content: t('section.useCase.card3.description'),
      icon: CirclePile,
    },
    {
      title: t('section.useCase.card4.title'),
      content: t('section.useCase.card4.description'),
      icon: Pickaxe,
    },
  ];

  return (
    <section
      id="use-case"
      className="px-2 md:px-10 lg:px-25 py-14 min-h-100 bg-muted/80 dark:bg-transparent"
    >
      {/* heading 2 */}
      <SectionHeader
        title={t('section.useCase.title')}
        subtext={t('section.useCase.subtitle')}
      />
      {/* cards */}
      <div className="flex max-w-6xl mx-auto gap-4 mt-10 flex-col md:flex-row [&_.card]:md:min-h-28 flex-wrap md:justify-center md:items-center w-full md:*:w-[calc(100%/2-1rem)]">
        {cardContents.map((c) => (
          <Card title={c.title} content={c.content} Icon={c.icon} />
        ))}
      </div>
    </section>
  );
};
