import Head from 'next/head';

const Meta = ({ title, keywords, description, logo, manifest }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no'
      />
      <meta name='theme-color' content='#000000' />
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta property='og:title' content={title} key='ogtitle' />
      <meta property='og:image' itemProp='image' content={logo} key='ogimage' />
      <meta property='og:type' content='website' />
      <meta
        property='og:description'
        content={description}
        key='ogdescription'
      />

      {manifest && <link rel='manifest' href={manifest} />}

      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='./favicons/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='./favicons/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='./favicons/favicon-16x16.png'
      />
      <link rel='manifest' href='./favicons/site.webmanifest' />
      <link
        rel='mask-icon'
        href='./favicons/safari-pinned-tab.svg'
        color='#5bbad5'
      />
    </Head>
  );
};

Meta.defaultProps = {
  title: 'App-Art.gr Task',
  keywords: 'app-art, task, nextjs',
  description: 'An application developed for a task assigned by app-art.',
};

export default Meta;
