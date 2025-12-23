import { Button } from '@/components/ui/button';
import { Logo } from './Logo';

export const Footer = ({
  content = 'haveContent',
}: {
  content?: 'haveContent' | 'noContent';
}) => {
  const ulClass = 'flex flex-wrap items-center justify-center space-x-4';

  return (
    <div className="text-sm flex flex-col flex-wrap items-center justify-center space-y-2 md:space-x-10 md:flex-row text-muted-foreground [&.line]:text-muted">
      {/* footer policy */}
      {content === 'haveContent' && (
        <>
          {/* footer */}
          <ul className={ulClass}>
            <li>
              <Logo size="sm" />
            </li>
            <span className="line">-</span>
            <li>Create Your Second Brain.</li>
          </ul>
          {/* footer links */}
          <ul className={ulClass}>
            <li>
              <a href="#">
                <Button className="p-0 text-muted-foreground" variant="link">
                  Features
                </Button>
              </a>
            </li>
            <span className="line">|</span>
            <li>
              <a href="#">
                <Button className="p-0 text-muted-foreground" variant="link">
                  How it works
                </Button>
              </a>
            </li>
            <span className="line">|</span>
            <li>
              <a href="#">
                <Button className="p-0 text-muted-foreground" variant="link">
                  Pricing
                </Button>
              </a>
            </li>
            <span className="line">|</span>
            <li>
              <a href="#">
                <Button className="p-0 text-muted-foreground" variant="link">
                  About
                </Button>
              </a>
            </li>
            <span className="line">|</span>
            <li>
              <a href="#">
                <Button className="p-0 text-muted-foreground" variant="link">
                  Contact
                </Button>
              </a>
            </li>
          </ul>

          {/* footer legal */}
          <ul className={ulClass}>
            <li>
              <a href="#">
                <Button className="p-0 text-muted-foreground" variant="link">
                  Privacy Policy
                </Button>
              </a>
            </li>
            <span className="line">♦</span>

            <li>
              <a href="#">
                <Button className="p-0 text-muted-foreground" variant="link">
                  Terms of Service
                </Button>
              </a>
            </li>
          </ul>
        </>
      )}
      {/* footer copyright - meta */}
      <div className="space-x-2 text-center">
        <span>&copy; {new Date().getFullYear()}</span>
        <span className="tracking-tighter text-foreground">Memoroom.</span>
        <span>All Rights reserved.</span>
        <span>Madagascar {'- Antananarivo'}.</span>
        <span>Built & Powered by</span>
        <a href="https://github.com/bossnare">
          <Button
            className="p-0 text-muted-foreground hover:text-foreground"
            variant="link"
          >
            Christo Razafimanga
          </Button>
        </a>
      </div>
    </div>
  );
};
