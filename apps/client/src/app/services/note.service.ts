export const NoteService = {
  createToEditor() {
    handleWait(() => {
      setAppLoading(true);
      handleWait(async () => {
        await navigate('/note/new');
        setAppLoading(false);
      }, 600);
    }, 200);
  },
};
