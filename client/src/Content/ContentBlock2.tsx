import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1200,
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function ContentBlock2(): JSX.Element {
  const classes = useStyles();

  return (
    <section className="bg-gray-100 text-gray-800 fonBlock2">
      <div className="max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        <div className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12">
          <img
            src="https://source.unsplash.com/random/480x360?movie"
            alt=""
            className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-500"
          />
          <div className="p-6 space-y-2 lg:col-span-5 block2">
            <h3 className="text-2xl font-semibold sm:text-4xl ">Окунись в мир кино</h3>

            <p>
              "Кино - это удивительный мир, где вы можете погрузиться в другие реальности и пережить
              невероятные приключения."
            </p>
            <p>
              "Современная киноиндустрия предлагает множество фильмов на любой вкус и настроение,
              которые могут вдохновить и удивить вас."
            </p>
            <p>
              "Кино - это искусство, которое может передать сложные эмоции и идеи, а также помочь
              вам понять мир вокруг себя и самих"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContentBlock2;
