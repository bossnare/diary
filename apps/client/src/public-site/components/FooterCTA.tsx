import { Button } from '@/components/ui/button';
import { useButtonSize } from '@/hooks/use-button-size';
import { Paragraphe } from '@/shared/components/Paragraphe';
import { handleWait } from '@/utils/handle-wait';
import { useTranslation } from 'react-i18next';

export function FooterCTA({
  setOpenLoginCard,
}: {
  setOpenLoginCard: () => void;
}) {
  const ctaSize = useButtonSize({ mobile: 'xl', landscape: 'lg' });
  const { t } = useTranslation();

  return (
    <section
      id="landing-cta"
      className="flex flex-col justify-center py-12 pb-20"
    >
      <span className="text-center">
        <Button
          onClick={() => handleWait(setOpenLoginCard, 300)}
          size={ctaSize}
          className="font-bold rounded-full shadow-lg shadow-primary dark:brightness-120"
        >
          {t('section.footerCTA.button')}
        </Button>
      </span>
      <Paragraphe className="text-sm text-center text-muted-foreground">
        {t('section.footerCTA.subtitle')}
      </Paragraphe>
    </section>
  );
}
