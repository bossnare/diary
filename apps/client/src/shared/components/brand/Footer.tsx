import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '@/components/language-toggle';

export const Footer = ({
  content = 'haveContent',
}: {
  content?: 'haveContent' | 'noContent';
}) => {
  const ulClass = 'flex flex-wrap items-center justify-center space-x-4';
  const { t } = useTranslation();

  return (
    <>
      <div className="text-sm flex flex-col flex-wrap [&_.link]:hover:text-foreground items-center justify-center gap-2 md:gap-1 md:space-x-10 md:flex-row text-muted-foreground [&_.divide]:text-muted-foreground/50">
        {/* footer policy */}
        {content === 'haveContent' && (
          <>
            {/* footer */}
            <ul className={ulClass}>
              <li>
                <a href="#footer">
                  <Logo size="sm" />
                </a>
              </li>
              <span className="divide">-</span>
              <div>
                <LanguageToggle />
              </div>
            </ul>
            {/* footer links */}
            <ul className={ulClass}>
              <li>
                <a href="#">
                  <Button
                    className="p-0 text-muted-foreground link"
                    variant="link"
                  >
                    {t('footer.label.features')}
                  </Button>
                </a>
              </li>
              <span className="divide">|</span>
              <li>
                <a href="#">
                  <Button
                    className="p-0 text-muted-foreground link"
                    variant="link"
                  >
                    {t('footer.label.howItWorks')} ?
                  </Button>
                </a>
              </li>
              <span className="divide">|</span>
              <li>
                <a href="#">
                  <Button
                    className="p-0 text-muted-foreground link"
                    variant="link"
                  >
                    {t('footer.label.pricing')}
                  </Button>
                </a>
              </li>
              <span className="divide">|</span>
              <li>
                <a href="#">
                  <Button
                    className="p-0 text-muted-foreground link"
                    variant="link"
                  >
                    {t('footer.label.about')}
                  </Button>
                </a>
              </li>
              <span className="divide">|</span>
              <li>
                <a href="#">
                  <Button
                    className="p-0 text-muted-foreground link"
                    variant="link"
                  >
                    {t('footer.label.contact')}
                  </Button>
                </a>
              </li>
            </ul>

            {/* footer legal */}
            <ul className={ulClass}>
              <li>
                <a href="#">
                  <Button
                    className="p-0 text-muted-foreground link"
                    variant="link"
                  >
                    {t('footer.legal.policy')}
                  </Button>
                </a>
              </li>
              <span className="divide">♦</span>

              <li>
                <a href="#">
                  <Button
                    className="p-0 text-muted-foreground link"
                    variant="link"
                  >
                    {t('footer.legal.term')}
                  </Button>
                </a>
              </li>
            </ul>
          </>
        )}
        {/* footer copyright - meta */}
        <div className="space-x-2 text-center">
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="font-medium tracking-tighter">Memoroom .</span>
          <span>{t('footer.meta.copy')}.</span>
          <span>Madagascar {'- Antananarivo'}.</span>
          <span> {t('footer.meta.build')}</span>
          <a href="https://github.com/bossnare">
            <Button className="p-0 text-muted-foreground link" variant="link">
              Christo Razafimanga
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};
