import config from "./config";

export function socialMenuHook() {
  /* Social menu friends search. */
  SocialMenu.prototype.maskInvitationList = function (this: typeof SocialMenu, scrollDist) {
    const pl = "Type to search.";
    const pad = 8;

    if (!this.listSearch) {
      this.listSearch = new InputField("list_search", false, SocialMenu.ItemHeight / 1.5);
      this.listSearch.setDimensions(this.listContainer.width, SocialMenu.ItemHeight);
      this.listSearch.forceLowerCase = false;
      this.listSearch.setMaxChars(128);
      this.listSearch.setFilter(
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890:/?.-_ "
      );
      this.listSearch.x = pad;
      this.listSearch.y = this.height - this.listSearch.height - pad / 2 - this.infoText.height;
      this.listSearch.setText(pl);
      const ls = this;
      this.listSearch.addListener(InputField.CHANGE, function (d) {
        d = d.data.value || "";
        if (d.startsWith(pl) || d == pl.slice(0, pl.length - 1)) {
          d = d.substring(pl.length);
          ls.listSearch.setText(d);
        }
        ls.maskInvitationList(ls.inviteScrollRatio);
      });
    }
    this.listContainer.removeChildren = () => {
      this.listContainer.removeChild(...this.listContainer.children);
      this.removeChild(this.listSearch);
    };

    const searchTerm = this.listSearch.getText() || "";
    const filtered =
      searchTerm && searchTerm !== pl
        ? this.invites.filter((i) => i.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : null;

    this.invites.forEach((i) => {
      i.alpha = 1;
      i.isRed = false;
      if (!i.redReady) {
        i.redReady = true;
        i.on("mouseout", function () {
          i.tint = i.isRed ? config.Colors.red : 12303291;
        });
      }
    });
    if (!this.listSearch.parent) this.addChild(this.listSearch);
    const listHeight = SocialMenu.ListHeight - this.listSearch.height - pad / 2;
    const itemDisplayCount = Math.floor(listHeight / SocialMenu.ItemHeight);
    if (this.invites.length <= itemDisplayCount) {
      this.listContainer.y = 0;
    } else {
      this.invites.forEach((i) => this.listContainer.removeChild(i));
      this.listContainer.y = -(
        scrollDist *
        (this.invites.length * SocialMenu.ItemHeight - (listHeight - SocialMenu.ItemHeight))
      );
      for (
        var d = Math.round(Math.abs(this.listContainer.y / SocialMenu.ItemHeight)),
          displayOffset = 0;
        displayOffset < itemDisplayCount;
        displayOffset++
      ) {
        const inv = this.invites[d + displayOffset];
        this.listContainer.addChild(inv);
        let g;
        if (0 === displayOffset) {
          g = d * SocialMenu.ItemHeight + this.listContainer.y;
          inv.alpha = 0 <= g ? 1 : 1 - (1 / (0.5 * SocialMenu.ItemHeight)) * Math.abs(g);
        } else {
          displayOffset === itemDisplayCount - 1
            ? ((g = d * SocialMenu.ItemHeight + this.listContainer.y),
              (inv.alpha = 0 > g ? 1 : 1 - (1 / (0.5 * SocialMenu.ItemHeight)) * Math.abs(g)))
            : (inv.alpha = 1);
        }
      }
      this.inviteScrollRatio = scrollDist;
    }
    this.listSearch.y = this.height - this.listSearch.height - pad / 2 - this.infoText.height;
    this.invites.forEach((i) => {
      i.tint = 12303291;
      if (!filtered) return;
      if (filtered.includes(i)) {
        i.tint = 12603201;
        i.alpha = 1;
        i.isRed = true;
      } else {
        i.alpha *= 0.5;
      }
    });
  };
}
