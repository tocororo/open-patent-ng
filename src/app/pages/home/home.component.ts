
import { query } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { ActionText, MetadataService } from "toco-lib";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit
{
    /**
     * Represents the `ActionText` enum for internal use.
     */
	public readonly actionText: typeof ActionText;

	public constructor(private _router: Router,
		private _activatedRoute: ActivatedRoute,
		public transServ: TranslateService,
		private _metadata: MetadataService)
	{
		this.actionText = ActionText;
	}

	public ngOnInit(): void
	{
		this._activatedRoute.url.subscribe(() => {
			this._metadata.meta.updateTag({ name: "DC.title", content: "Personas" });
			this._metadata.meta.updateTag({ name: "DC.description", content: "Gestiona los perfiles de los investigadores así como de otras personas relacionados con la investigación científica, identificando a cada una de ellas de manera unívoca y promoviendo la desambiguación de perfiles" });
		});
	}

	public queryChange(event?: string): void{
		this._router.navigate(['/search'], {
			relativeTo: this._activatedRoute,
			queryParams: { q: event },
			queryParamsHandling: "",
		});
	}
}
