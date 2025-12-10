import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Star, DollarSign, ArrowRight, Zap, Shield, Share2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const stats = [
    {
      icon: Users,
      title: t('active_businesses'),
      value: "500+",
      growth: t('this_month')
    },
    {
      icon: DollarSign,
      title: t('cashback_distributed'),
      value: "$45,000",
      growth: t('vs_last_month')
    },
    {
      icon: TrendingUp,
      title: t('incremental_sales'),
      value: "35%",
      growth: t('avg_per_business')
    },
    {
      icon: Star,
      title: t('customer_satisfaction'),
      value: "4.8/5",
      growth: t('recommend_it')
    }
  ];

  const features = [
    {
      icon: Zap,
      title: t('intelligent_cashback'),
      description: t('intelligent_cashback_desc')
    },
    {
      icon: Share2,
      title: t('multilevel_referrals'),
      description: t('multilevel_referrals_desc')
    },
    {
      icon: Shield,
      title: t('no_apps_to_download'),
      description: t('no_apps_to_download_desc')
    }
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              FideliPromo
            </span>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" onClick={() => changeLanguage('en')}>EN</Button>
            <Button variant="ghost" onClick={() => changeLanguage('es')}>ES</Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
            >
              {t('customer_login')}
            </Button>
            <Button
              onClick={() => navigate('/register/business')}
            >
              {t('register_business')}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            {t('main_heading')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t('hero_description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => navigate('/register/business')}
              className="text-lg px-8 py-4"
            >
              {t('try_free_30_days')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/demo')}
              className="text-lg px-8 py-4"
            >
              {t('view_demo')}
            </Button>
          </div>

          {/* Features Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mb-2">{stat.title}</div>
                  <div className="text-xs text-green-600 font-medium">{stat.growth}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-muted py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">F</span>
            </div>
            <span className="text-2xl font-bold">FideliPromo</span>
          </div>
          <p className="text-muted-foreground mb-4">
            {t('your_strategic_ally')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('rights_reserved')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
