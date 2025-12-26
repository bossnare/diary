import { Languages } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';

export function LanguageToggle() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage as string;
  const languages: Record<string, string> = {
    en: t('language.en'),
    fr: t('language.fr'),
    mg: t('language.mg'),
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Languages /> {languages[currentLanguage]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => i18n.changeLanguage('en')}>
          {t('language.en')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage('fr')}>
          {t('language.fr')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage('mg')}>
          {t('language.mg')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
