import { Code2, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router";
import Container from "../../components/container/container";

const Footer = () => {
  return (
    <footer className="backdrop-blur-sm shadow-sm mt-20">
      <Container>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-black">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text">
                  DevScoop
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Your community-driven platform for developer resources and
                insights.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <div className="space-y-2">
                <Link
                  to="/blogs"
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Browse Blogs
                </Link>
                <Link
                  to="/featured"
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Featured
                </Link>
                <Link
                  to="/wishlist"
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Wishlist
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Documentation
                </a>
                <a
                  href="#"
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  API Reference
                </a>
                <a
                  href="#"
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Community
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-2 rounded-lg  transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} DevScoop. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
